module.exports.iniciaChat = function(application, req, res){
	var dadosForm = req.body;
	var erros = [];

	if(dadosForm.apelido === "" || dadosForm.apelido === null){
		erros[0] = "Apelido não pode ser vazio!";
	}

	if(erros[0] != null){
		res.render("index", {validacao : erros});
		return;
	}

	application.get('io').emit(
		'MsgParaCliente',
		{apelido : dadosForm.apelido, mensagem : "Acabou de entrar no chat"}
	)
	res.render('chat', {dadosForm : dadosForm});
}