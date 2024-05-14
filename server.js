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
    key: fs.readFileSync('/etc/ssl/certs/koboldhoehle/privkey.pem'), // Pfad zum privaten Schlüssel
    cert: fs.readFileSync('/etc/ssl/certs/koboldhoehle/fullchain.pem') // Pfad zum Zertifikat
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
            console.log(`IP:\t${ipAddress}\t\tconnected | [${new Date().toLocaleTimeString()} : ${new Date().toLocaleDateString()}]`);
        }
    } catch (error) {
        console.error('Error parsing IP:', error);
    }

    /*socket.on('save settings', (settingsJson) => {
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
    });*/

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
                              console.log(`IP:\t${ipAddress}\t\tdisconnected | [${new Date().toLocaleTimeString()} : ${new Date().toLocaleDateString()}]`);
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

const httpApp = express();
const http = require('http');

httpApp.get("*", function(req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});

http.createServer(httpApp).listen(80, function() {
    console.log("Express TTP server listening on port 80");
});

// Start the server on port 443
const port = 443;
server.listen(port, () => {
    console.log(`Server listening on https://localhost`);
});
