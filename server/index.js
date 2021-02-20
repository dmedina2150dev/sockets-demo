var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("client"));

app.get('/hola-mundo', function(req, res){
	res.status(200).send("Hola Mundo desde una ruta");
});


var messages = [{
	id: 1,
	text: 'Bienvenido Al chat privado de Socket.io y nodejs',
	nickname: "Bot - Dajan Medina"
}];

io.on('connection', function(socket){
	console.log("Alguien se ha conectado IP: "+socket.handshake.address);

	socket.emit('messages', messages);

	socket.on('add-message', function(datos){
		messages.push(datos);

		io.sockets.emit('messages', messages);
	});

});


server.listen(6677, function(){
	console.log("Servidor esta funcionando en http://localhost:6677");
});
