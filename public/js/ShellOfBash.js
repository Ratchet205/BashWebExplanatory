/*const socket = new WebSocket('ws://192.168.2.106:8081');

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
}*/

window.onload = function() {
  function term() {
    const inputfield = document.getElementById("eingabe");
    const output = document.getElementById("output");
    
    inputfield.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (inputfield.value === 'clear') {
          output.innerHTML = null;
          inputfield.value = null;
          return;
        } else {
          if (inputfield.value === 'exit') {
            //stop docker maschine
            window.close();
          }
        }
        try {
          const toremove = output.querySelector("#bottom");
          toremove.removeAttribute('id');
        } catch (e) { console.log(e) };
        output.innerHTML = output.innerHTML + `<span><span style="color: #7ec699;">Guest@PC~$</span> ${inputfield.value}</span><br><br id="bottom">`;
        output.querySelector('#bottom').scrollIntoView({ behavior: 'smooth' });
        inputfield.value = null;
      }
    })
  }
  term();
}

function  CloseBashFunktion() {
  document.close();
}

// Function to handle the hotkey action
function handleHotkey(event) {
  if (event.ctrlKey && event.altKey && event.key === 's') {
      try {
          CloseBashFunktion();
      } catch (e) {console.log(e)}
  }
}

// Attach a keydown event listener to the document
document.addEventListener('keydown', handleHotkey);