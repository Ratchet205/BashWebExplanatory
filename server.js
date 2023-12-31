const cW = require('node-hide-console-window');
const showingWindow = false;
cW.hideConsole();
const express = require('express');
const https = require('https');
const socketIO = require('socket.io');
const jquery = require('jquery');
const glob = require('glob');
const net = require('net');
const fs = require('fs');
const { exec } = require('child_process');
const phpExpress = require('php-express')({
    binPath: __dirname + '/php-8.2.10',
  });
const app = express();
const server = https.createServer({
    key: fs.readFileSync('./certificates/server.key'), // Pfad zum privaten Schlüssel
    cert: fs.readFileSync('./certificates/server.crt') // Pfad zum Zertifikat
}, app);

const io = socketIO(server);

const pattern = '*.apef';
// Der Pfad zur ICO-Datei
const iconFilePath = './public/img/apef.ico';
// Der Pfad zur erstellten APEF-Datei
const apefFilePath = './*.apef';




glob(pattern, (err, files) => {
  if (err) {
    console.error('Error matching files:', err);
    return;
  }

  if (files.length === 0) {
    console.log('No .apef files found.');
    return;
  }

  files.forEach((file) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.error(`Error deleting file ${file}:`, err);
      } else {
        console.log(`Deleted file: ${file}`);
      }
    });
  });
});


// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use((req, res, next) => {
    if (req.path.endsWith('.php')) {
        // Set the content type to HTML for PHP files
        res.contentType('text/html');

        // Execute the PHP script using php-express
        phpExpress(req, res, next);
    } else {
        // Pass control to the next middleware for non-PHP files
        next();
    }
});
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
        const filename = `${ipAddress}.apef`;

        if (fs.existsSync(`./${ipAddress}.apef`)) {
            path = `./${ipAddress}.apef`
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
                    /*const command = `assoc .apef=BashWebExp.APEFFileType && ftype BashWebExp.APEFFileType="${iconFilePath}" "./${filename}"`;
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                          console.error(`Fehler beim Zuordnen des Icons: ${error}`);
                          return;
                        }
                        console.log('Icon erfolgreich zugeordnet.');
                      });*/
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
        const path = `./${ipAddress}.apef`
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
const port = 443;
server.listen(port, () => {
    console.log(`Server listening on http://localhost`);
});

const NetServer = net.createServer((netsocket) => {
  netsocket.on('switchingConsoleVisib', (msg) => {
    if (msg == 'close') {
      if (showingWindow == false) {
        console.log('tries to show');
        showingWindow = true;
        cW.showConsole();
      } else {
        console.log('tries to hide');
        showingWindow = false;
        cW.hideConsole();
      }
    }
  });

  netsocket.on('disconnect', () => {
    console.log('Shocon executed')
  });
});

const PORT = 9999;
NetServer.listen(PORT, () => {
  console.log('running "Shocon"...');
});