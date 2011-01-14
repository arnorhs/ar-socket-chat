
var socket;
var user = {
	connected: false,
	username: ''
}


if (connect_to_chat_server()) {
	user.connected = true;
} else {
	document.writeln('Sorry, No socket.io JS document - chat server is very possibly not running');
}





function connect_to_chat_server () {

	if (typeof io == "undefined") {
		return false;
	}

	socket = new io.Socket("localhost", {port : 8080}); 
	socket.connect();
	socket.on('connect', function(){ addmsg('connect','somebody connected'); }) 
	socket.on('message', function(data){
	
		for(i in data.buffer) {
			addmsg('buffered',data.buffer[i].message[1]);
		}
	
		if (typeof data.message != "undefined") {
			//console.log(data.message[1]);
			addmsg('normal',data.message[1]);
		} 
		
	}) 
	socket.on('disconnect', function(){ addmsg('connect','somebody disconnected');  });

	return true;

}

function addmsg (type, socket_message) {

	// maybe we should be sanitizing here as well... not just on the server...
	if (typeof socket_message == 'string') {
		var username = '';
		var txt = socket_message;
	} else {
		var username = socket_message.username;
		var txt = socket_message.txt;	
	}
	

	

	if (txt.length < 1) {
		return;
	}
	
	if (username.length > 0) {
		var contents = '<div class="entry '+type+'">'+
						'<div class="user">'+username+'</div>'+
						'<div class="txt">'+txt+'</div>'+
						'</div>'		
	
	} else {
		var contents = '<div class="entry '+type+'">'+
						'<div class="txt">'+txt+'</div>'+
						'</div>'		
	}

	$('#box').append(contents);

    
}



function generatename () {
	return 'Notandi nr. '+Math.floor(Math.random()*501)
}

function sendmsg () {
	var v = $('textarea').val();
	var socket_message = {
		'txt':v,
		'username': user.username
	};
	socket.send(socket_message);
	
	// we'll need to encode it before we show it to the user
	
	//console.log(socket_message);	
	// nothing seems to be happening here - need to contact the author... ?
	socket_message.username = sanitize(socket_message.username).entityEncode();
	//console.log(socket_message);
	
	$('textarea').val('');
	addmsg('msg',socket_message);
	$(window).scrollTop(9999999);
	
}

$(document).ready(function(){

	// tékka kannski hvort við séum tengd... ? (seinna)
	
	$('#login button').click(function(){
		if ($('#login #username').val().length > 0) {
			user.username = $('#login #username').val();
			$('#login').hide();
			$('#controls').show();
			$('textarea').val('').focus();
		} else {
			// Láta vita
		}
	});

	$('textarea').val('');
	$('#controls').hide();
	$('#login #username').focus();


    $('#controls textarea').keydown(function(e){
    
    	// disabled unless you've picked a username
    	if (user.username.length < 1) {
    		return false;
    	}
	
		if (e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
			sendmsg();
			return false;
			
		}
		
		//console.log(e, e.keyCode, e.charCode);

    });
    
   
    
});
