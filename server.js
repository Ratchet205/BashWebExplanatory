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
    const clientAddress = socket.handshake.address;
    const family = socket.handshake.headers['x-forwarded-for'] ? 'IPv6' : clientAddress.includes(':') ? 'IPv6' : 'IPv4';
    const ipAddress = family === 'IPv4' ? clientAddress : clientAddress.split('::ffff:')[1];

    try {
        //const JsonIP = JSON.parse(ipAddress);

        // Create a JSON file with the received settings asynchronously
        const filename = `${ipAddress}.ip`;

        if (fs.existsSync(`./${ipAddress}.ip`)) {
            path = `./${ipAddress}.ip`
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Fehler beim Lesen der Datei: ${err}`);
                    return;
                }

                // Den Wert aus der Datei parsen und um eins erhöhen
                const currentValue = parseInt(data, 10);
                const newValue = currentValue + 1;

                // Das erhöhte Ergebnis in die Datei schreiben
                fs.writeFile(path, newValue.toString(), (writeErr) => {
                    if (writeErr) {
                        console.error(`Fehler beim Schreiben in die Datei: ${writeErr}`);
                        return;
                    }
                });
            });
        } else {
            fs.writeFile(filename, JSON.stringify(1, null, 2), (error) => {
                if (error) {
                    console.error('Error saving IP:', error);
                } else {
                    console.log(`File:\t./${filename}\tcreated`);
                }
            });
            console.log(`IP:\t${ipAddress}\t\tconnected`);
        }
    } catch (error) {
        console.error('Error parsing IP:', error);
    }

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
        const path = `./${ipAddress}.ip`
        try {
            if (fs.existsSync(path)) {
                /*fs.unlink(path, (err) => {
                    if (err) {
                      console.error(`Error deleting file: ${err}`);
                    } else {
                      console.log(`File:\t${path}\tdeleted`);
                    }
                  });*/
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Fehler beim Lesen der Datei: ${err}`);
                        return;
                    }

                    const currentValue = parseInt(data, 10);
                    const newValue = currentValue - 1;

                    if (newValue <= 0) {
                        fs.unlink(path, (err) => {
                            if (err) {
                              console.error(`Error deleting file: ${err}`);
                            } else {
                              console.log(`File:\t${path}\tdeleted`);
                              console.log(`IP:\t${ipAddress}\t\tdisconnected`);
                            }
                          });
                    } else {
                        fs.writeFile(path, newValue.toString(), (writeErr) => {
                            if (writeErr) {
                                console.error(`Fehler beim Schreiben in die Datei: ${writeErr}`);
                                return;
                            }
                        });
                    }
                })
            }
        } catch {
        }
    });
});

// Start the server on port 80
const port = 80;
server.listen(port, () => {
    console.log(`Server listening on http://localhost`);
});
