
/*
	There are two dependencies besides node.js:
		- socket.io
		- node-validator (https://github.com/chriso/node-validator)
	They are both installed using npm
*/

var http = require('http'),  
	sanitize = require('validator').sanitize,
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io');

server = http.createServer(function(req, res){ 
 // your normal server code 
 res.writeHead(200, {'Content-Type': 'text/html'});   
});
server.listen(8080, "127.0.0.1");


// socket.io 
var buffer = [];

var socket = io.listen(server); 
socket.on('connection', function(client){ 
    client.send({ buffer: buffer });
    
    client.broadcast({ announcement: client.sessionId + ' connected' });

    client.on('message', function(message){
        var msg = { message: [client.sessionId, message] };
        
        // if it's not a string, we'll need to iterate through all it's properties
        // this should be recursive, right?
        var o = msg.message[1];
    	for (var i in o) {
    		if (typeof o[i] != 'string') {
    			console.log('alert: non-string value found in the message');
    		}
    		o[i] = sanitize(o[i]).entityEncode();
    		console.log(o[i]);
        	// else: leave alone 
    	}
    	msg.message[1] = o;
    	
    	// push buffer
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        client.broadcast(msg);
    });

    client.on('disconnect', function(){
        client.broadcast({ announcement: client.sessionId + ' disconnected' });
    });

}); 
