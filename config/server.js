/* importar módulo do express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

// TODO importar o express-validator

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'views' e 'view engine' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended : true}));

// TODO configurar o middleware do express-validator

/* autoload das rotas, models e controllers para o app via consign */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app)

/* exportar o objeto app */
module.exports = app;