<html>
<head>
<script src="http://localhost:8080/socket.io/socket.io.js"></script> 
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script> 
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

	$('textarea').val('').focus();

    $('#controls textarea').keydown(function(e){
	
		if (e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
			sendmsg();
			return false;
			
		}
		
		//console.log(e, e.keyCode, e.charCode);

    });
    
   
    
});
</script>
<style type="text/css">
html,td,p,body,textarea {
	margin:0;
	padding:0;
}
body,td,textarea {
	font-family: "arial",helvetica,sans;
}
#mainwrap {
	width: 100%;
	min-height: 100%;
	position: relative;
}
#box {

	padding-bottom: 30px;
	padding: 0 5px 30px 5px;
	
}
#controls {
	position: fixed;
	bottom: 0px;
	height: 40px;
	width: 100%; 
	background: #CCC;
}
#box .msg {
	white-space: pre;
}
#controls .controls_wrap {
	padding: 4px 4px;
}

#controls textarea {
	height: 30px;
	display:inline-block;
	padding: 3px;
	width: 100%;
	background:#FFF;
	border:0;
}
button {
	display:inline-block;
	border: 2px solid #CCC;
}
</style>

</head>
<body>
<div id="mainwrap">
	<div id="box"></div>
	<div id="controls">
		<div class="controls_wrap">
			<textarea></textarea>
		</div>
	</div>
</div>
</body>
</html>
