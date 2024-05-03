import asyncio
import websockets
import json
import docker
from datetime import datetime
import logging

# Utility function to generate a unique timestamp
epoch = datetime.utcfromtimestamp(0)
def create_unique_timestamp():
    return f"{(datetime.now() - epoch).total_seconds() * 1000000:.0f}"

# Set up logging for better debugging
logging.basicConfig(level=logging.INFO)

sessions = {}

# Connect to Docker
docker_client = docker.from_env()

# Function to create a new Docker container for a given name
def create_container(name):
    container = docker_client.containers.create(
        image="alpine",  # Change as needed
        name=name,
        detach=True,
        tty=True,
        stdin_open=True  # Allow interaction via standard input
    )
    container.start()
    sessions[name] = container
    logging.info(f"Container {name} created and started.")
    return name

# Function to execute commands in the specified container
def execute_command(name, command):
    container = sessions.get(name)
    if container:
        exec_result = container.exec_run(command)
        return exec_result.output.decode()
    else:
        return "Container not found"

# Function to remove a container by its name
def remove_container(name):
    container = sessions.get(name)
    if container:
        container.stop()
        container.remove()
        del sessions[name]
        logging.info(f"Container {name} stopped and removed.")
    else:
        logging.warning(f"Container {name} not found.")

# WebSocket server handler
async def websocket_handler(websocket, path):
    # Unique session identifier (WebSocket object)
    name = websocket

    try:
        async for message in websocket:
            if message == "create":
                create_container(name)
                await websocket.send(f"Container created with name: {name}")
            
            elif message == "exit":
                await websocket.close()

            else:
                await websocket.send(execute_command(websocket, message))
    
    except websockets.exceptions.ConnectionClosed:
        logging.info(f"Connection closed by client: {websocket.remote_address}")

# Main coroutine to start the WebSocket server
async def main():
    server = await websockets.serve(websocket_handler, "localhost", 8765)
    logging.info("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()

# Start the WebSocket server
asyncio.run(main())
