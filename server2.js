const express = require('express');
const app = express();
const path = require('path');

console.clear();

app.get('/', (req, res) => {
    const rawIp = req.socket.remoteAddress;
    const ipv4 = rawIp.replace(/^.*:/, '');

    console.log(`Requesting Client:\nIP:\t${ipv4}\nUser-Agent:\t${req.get('User-Agent')}`);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static('public'));

const port = 80;
app.listen(port, () => {
    console.log("Express only server launched.")
});
