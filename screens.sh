/bin/sh -c 'exec /usr/bin/screen -dmS webserver /bin/bash -c "sudo node server.js"'

/bin/sh -c 'exec /usr/bin/screen -dmS docksock /bin/bash -c "sudo python3 server.py"'