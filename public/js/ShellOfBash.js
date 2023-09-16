const socket = new WebSocket('ws://192.168.2.106:8081');

socket.onopen = (event) => {
  console.log("WebSocket connection opened:", event);
};

socket.onmessage = (event) => {
  console.log("Received message:", event.data);
};

socket.onclose = (event) => {
  console.log("WebSocket connection closed:", event);
};

function sendMessage(message) {
    socket.send(message);
}