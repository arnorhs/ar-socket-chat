
var user = {
	connected: false,
	username: ''
}


if (!connect_to_chat_server()) {
	document.writeln('Sorry, No socket.io JS document - chat server is very possibly not running');
	
} else {
	user.connected = true;
}





function connect_to_chat_server () {

	if (typeof io == "undefined") {
		return false;
	}

	var socket = new io.Socket("localhost:8080"); 
	socket.connect();
	socket.on('connect', function(){ addmsg('connect','somebody connected'); }) 
	socket.on('message', function(data){
	
		for(i in data.buffer) {
			addmsg('buffered',data.buffer[i].message[1]);
		}
	
		if (typeof data.message != "undefined") {
			addmsg('normal',data.message[1]);
		} 
		
	}) 
	socket.on('disconnect', function(){ addmsg('connect','somebody disconnected');  });

	return true;

}

function addmsg (type, txt) {
	if (txt.length > 0) {
		$('#box').append('<div class="msg '+type+'">'+txt+'</div>');
	}
    
}



function generatename () {
	return 'Notandi nr. '+Math.floor(Math.random()*501)
}

function sendmsg () {
	var v = $('textarea').val();
	socket.send(v);
	$('textarea').val('');
	addmsg('msg',v);
	$(window).scrollTop(9999999);
	
}

$(document).ready(function(){

	// tékka kannski hvort við séum tengd... ? (seinna)
	
	$('#login button').click(function(){
		if ($('#login #username').val().length > 0) {
			user.username = $('#login #username').val();
		} else {
			// Láta vita
		}
	});

	$('textarea').val('').focus();

    $('#controls textarea').keydown(function(e){
	
		if (e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
			sendmsg();
			return false;
			
		}
		
		//console.log(e, e.keyCode, e.charCode);

    });
    
   
    
});
