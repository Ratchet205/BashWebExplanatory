const cW = require('node-hide-console-window');
cW.hideConsole();
const net = require('net');
const { exit } = require('process');

const client = net.createConnection({ port: 9999 }, () => {
    console.log('Connected to server');
    client.emit('switchingConsoleVisib', 'close');
    client.end();
  });

client.on('end', () => {
    console.log('Shocon executed');
});

setTimeout(() => {
    exit();
}, 500);