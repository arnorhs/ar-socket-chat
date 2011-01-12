var http = require('http'),  
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 
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
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        client.broadcast(msg);
    });

    client.on('disconnect', function(){
        client.broadcast({ announcement: client.sessionId + ' disconnected' });
    });

}); 
