ar-socket-chat
==============

This is a simple test project to test creating group chat using socket.io.

It includes the server code for running the node.js server as well as the client side chat app (which is pure html/css/js)

Running this thing
------------------
1. Clone this repository
2. Run "node-code/a.js
3. Serve the www folder up in some apache server

Notes
-----

The /www folder is pure html stuff and is intended to be served using any web server. It can be any folder on your website, etc. I was using apache in my setup.

The node code, however, will start its own server on port 8080 which the client side code in /www will connect to (and fetch socket.io client side js library)



