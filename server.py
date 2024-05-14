import os
import ssl
import asyncio
import websockets
import json
import docker
from datetime import datetime
import logging

certfile = "/etc/ssl/certs/koboldhoehle/fullchain.pem"
keyfile = "/etc/ssl/certs/koboldhoehle/privkey.pem"



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
        stdin_open=True,  # Allow interaction via standard input
        network_mode='none'
    )
    container.start()
    sessions[name] = container
    logging.info(f"Container {name} created and started.")
    return name

"""
# Function to execute commands in the specified container
def execute_command(name, command, path = None):
    container = sessions.get(name)
    if container:
        if path is not None:
            exec_result = container.exec_run(f'/bin/sh -c "cd {path} && {command}"')
            return exec_result.output.decode()
        exec_result = container.exec_run(f'{command}')
        return exec_result.output.decode()
    else:
        return "Container not found"
"""

# Function to remove a container by its name
async def async_remove_container(name):
    container = sessions.get(name)
    if container:
        try:
            await asyncio.to_thread(container.stop)  # Run in a separate thread
            await asyncio.to_thread(container.remove)  # Run in a separate thread
            del sessions[name]
            logging.info(f"Container {name} stopped and removed.")
        except Exception as e:
            logging.error(f"Error removing container {name}: {e}")
    else:
        logging.warning(f"Container {name} not found.")

# WebSocket server handler
async def websocket_handler(websocket, path):
    # Unique session identifier (WebSocket object)
    name = create_unique_timestamp()

    directory = "/"

    def execute_command(name, command):
        container = sessions.get(name)
        if container:
            exec_result = container.exec_run(f'/bin/sh -c "cd {directory} && {command} &"')
            return exec_result.output.decode()
        else:
            return "Container not found"

    try:
        async for message in websocket:
            if message == "create":
                try:
                    await async_remove_container(name)
                except:
                    continue

                create_container(name)
                await websocket.send(f"<span style=\"display: flex; justify-content: right; color: #666\">Connected to Container {name}</span><br>")
            
            elif message == "exit":
                print(f"terminating {name}")
                await websocket.send(f"<span style=\"display: flex; justify-content: right; color: #666\">Container is terminating</span><br>")
                await async_remove_container(name)
                await websocket.send(f"<span style=\"display: flex; justify-content: right; color: #666\">Connection to Container lost</span><br>")

            elif message.startswith("cd "):
                directory = execute_command(name, f"{message} && pwd").split("\n", 1)[0]
                await websocket.send(directory)

            else:
                await websocket.send(execute_command(name, message))
    
    except websockets.exceptions.ConnectionClosed:
        logging.info(f"Connection closed by client: {websocket.remote_address}")
    finally:
        await async_remove_container(name)

# Main coroutine to start the WebSocket server
async def main():
    debug = True
    if not debug:
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ssl_context.load_cert_chain(certfile=certfile, keyfile=keyfile)
        server = await websockets.serve(websocket_handler, "0.0.0.0", 8765, ssl=ssl_context)
        await server.wait_closed()
    else:    
        server = await websockets.serve(websocket_handler, "0.0.0.0", 8765)
        logging.info("WebSocket server started on wss://0.0.0.0:8765")
        await server.wait_closed()

# Start the WebSocket server
asyncio.run(main())
