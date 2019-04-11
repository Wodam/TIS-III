// REQUIRES
// Middleware for requests
const bodyParser = require('body-parser');
// Requests logger
const morgan = require('morgan');
// Router
const express = require('express')();
// Cors (Cross origin requests)
const cors = require('cors');

// UTILS
// Database
const database = require('./app/database');
// Model
const model = require('./app/models');

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
express.use(cors());

// ROUTES
express.use(require('./app/communications/rest/api'));

// START SERVER
express.listen(port, _ => {
	try {
	  console.log(`Server is running at ${port}`);

		// DATABASE CONNECT
		database.connect();
	} catch (e) {
		console.log(e)
	}
});
