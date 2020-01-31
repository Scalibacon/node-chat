/* importar configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online (porta 80)');
});

var io = require('socket.io').listen(server);

app.set("io", io);

/* criar conexão por websocket */
io.on('connection', function(socket){
	console.log("Usuário conectou");

	socket.on("disconnect", function(){
		console.log("Usuário desconectou");
	});

	socket.on("MsgParaServidor", function(data){

		/* Diálogo */
		socket.emit(
			"MsgParaCliente", 
			{ apelido : data.apelido, mensagem : data.mensagem}
		);

		socket.broadcast.emit(
			"MsgParaCliente", 
			{ apelido : data.apelido, mensagem : data.mensagem}
		);

		/* Participantes */
		if(parseInt(data.apelidos_atualizados) == 0){
			socket.emit(
				"PartyParaCliente", 
				{ apelido : data.apelido}
			);

			socket.broadcast.emit(
				"PartyParaCliente", 
				{ apelido : data.apelido}
			);
		}
	});
})