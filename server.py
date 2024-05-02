import json
import docker
import asyncio
import websockets
from datetime import datetime
import logging


# Utility function to generate a unique timestamp
epoch = datetime.utcfromtimestamp(0)
def create_unique_timestamp():
    return f"{(datetime.now() - epoch).total_seconds() * 1000000:.0f}"

# Set up logging for better debugging
logging.basicConfig(level=logging.INFO)

# Dictionary to store active WebSocket connections by container name
active_connections = {}
# Dictionary to store Docker containers by container name
container_dict = {}

# Connect to Docker
docker_client = docker.from_env()

# Create and start a new container for a given IP
def create_container(ip):
    container_name = f"{ip}-{create_unique_timestamp()}"
    container = docker_client.containers.create(
        image="alpine",  # Change as needed
        name=container_name,
        detach=True,
        tty=True,
        stdin_open=True  # Allow interaction via standard input
    )
    container.start()
    container_dict[container_name] = container
    return container_name

# Function to execute commands in the container
def container_execute(container_name, command):
    container = container_dict.get(container_name)
    if container:
        exec_result = container.exec_run(command)
        return exec_result.output.decode()
    else:
        return "Container not found"

# Function to remove a container by its name
def remove_container(container_name):
    container = container_dict.get(container_name)
    if container:
        container.stop()
        container.remove()
        del container_dict[container_name]
        logging.info(f"Container {container_name} stopped and removed.")
    else:
        logging.warning(f"Container {container_name} not found.")

# Handle WebSocket connections and create a new container
async def on_connect(websocket):
    client_ip = websocket.remote_address[0]
    container_name = create_container(client_ip)
    logging.info(f"Client from IP {client_ip} connected, container {container_name} created.")

    active_connections[container_name] = websocket
    return container_name

# Handle WebSocket disconnections
async def on_disconnect(container_name):
    if container_name in active_connections:
        del active_connections[container_name]

    remove_container(container_name)
    logging.info(f"Client and container {container_name} disconnected.")

# Handle incoming WebSocket messages by forwarding them to the Docker container
async def on_message(container_name, message):
    output = container_execute(container_name, message)
    await active_connections[container_name].send(json.dumps({"response": output}))

# Main WebSocket server coroutine
async def server(websocket, path):
    container_name = await on_connect(websocket)

    try:
        async for message in websocket:
            # Forward the message to the container and send back the output
            await on_message(container_name, message)
    
    except websockets.ConnectionClosed:
        pass  # Handle disconnection gracefully
    
    finally:
        await on_disconnect(container_name)

# Main coroutine to start the WebSocket server
async def main():
    async with websockets.serve(server, "localhost", 8765):
        logging.info("WebSocket server started at ws://localhost:8765/")
        await asyncio.Future()  # Keep the server running indefinitely

# Run the WebSocket server
if __name__ == "__main__":
    asyncio.run(main())
