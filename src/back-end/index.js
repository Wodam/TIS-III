// REQUIRES
// Middleware for requests
const bodyParser = require('body-parser');
// Requests logger
const morgan = require('morgan');
// Router
const express = require('express')();

// UTILS
// Database
const database = require('./utils/database');
// Model
const model = require('./utils/model');

// PORTS
const port = process.env.PORT || 3000

// SERVER
var server = require('http').createServer(express);

// APP
express.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({
  extended: false
}));

// ROUTES
express.use(require('./communications/rest/api'));

// START SERVER
express.listen(port, async (err) => {
  console.log(`Server is running at ${port}`);

	// DATABASE CONNECT
	database.connect().then(database => {
		console.log('Database connected :)');
		model.importAll(database.sequelize).then(models => {
			console.log('Models loaded');
			// models.Question.create({ text: 'Isso é o texto da questão.', competencias: 'Aqui ficam as competencias', habilidades: 'Aqui ficam as habilidades', alternativas: 'Aqui ficam as alternativas' })
		}).catch(error => {
			console.error('Error on models load.');
			console.log(error);
		});
	}).catch(error => {
		console.error('Error on connect to database :(');
		console.log(error);
	});
});
