<!doctype html>
<!--[if lt IE 7 ]><html lang="en" class="ie6"><![endif]-->
<!--[if (gt IE 6)|!(IE)]><!--><html lang="en"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<script src="http://localhost:8080/socket.io/socket.io.js"></script> 
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script src="ar-socket-chat-client.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<!-- Modernizr for feature detection of CSS3 and HTML5; must be placed in the "head" -->
	<script src="js-lib/modernizr-1.6.min.js"></script>
</head>
<body class="themed">
<div id="mainwrap">
	<div id="box"></div>
	<div id="controls">
		<div class="controls_wrap">
			<textarea></textarea>
		</div>
	</div>
</div><!-- #mainwrap -->
<div id="login">
	<div class="overlay">
		<div class="wrap">
			<h2>Welcome to ar-socket-chat</h2>
			<p>Please type a nick name for yourself.</p>
			<label for="username">Username:</label>
			<input type="text" id="username" />
			<button>OK</button>
		</div>
	</div>
</div><!-- #login -->
</body>
</html>
