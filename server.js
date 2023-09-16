const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle the root URL ('/') with your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('save settings', (settingsJson) => {
        console.log(`Received settings: ${settingsJson}`);
    
        // Parse the incoming JSON string to a JavaScript object
        try {
            const settingsData = JSON.parse(settingsJson);
    
            // Create a JSON file with the received settings asynchronously
            const filename = 'settings.json';
            fs.writeFile(filename, JSON.stringify(settingsData, null, 2), (error) => {
                if (error) {
                    console.error('Error saving settings:', error);
                } else {
                    console.log(`Settings saved to ${filename}`);
                }
            });
        } catch (error) {
            console.error('Error parsing settings:', error);
        }
    });

    socket.on('derBefehl', (befehl) => {
        console.log(`folgender Befehl: ${befehl}`);
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 80
const port = 80;
server.listen(port, () => {
    console.log(`Server listening on http://localhost`);
});
