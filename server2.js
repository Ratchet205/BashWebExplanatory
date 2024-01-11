//server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

console.clear();

app.get('/', (req, res) => {
    const rawIp = req.socket.remoteAddress;
    const ipv4 = rawIp.replace(/^.*:/, '');

    console.log(`Requesting Client:\nIP:\t${ipv4}\nUser-Agent:\t${req.get('User-Agent')}`);

    // Specify the file path
    const filePath = path.join(__dirname, 'public', 'index.html');
    const variable = "hallo"; //here the cookie have to be gained, not in the "js to display" file!!!
    // Read the contents of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        // Send the contents of the file as the response
        
        res.send(eval(data));
    });
});

app.use(express.static('public'));

const port = 80;
app.listen(port, () => {
    console.log("Express only server launched.")
});