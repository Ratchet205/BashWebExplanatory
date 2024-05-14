#!/bin/bash

/bin/sh -c 'exec /usr/bin/screen -dmS webserver /bin/bash -c "sudo node server.js"'

/bin/sh -c 'exec /usr/bin/screen -dmS docksock /bin/bash -c "source WebVMProviding/bin/activate && WebVMProviding/bin/python3 server.py"'