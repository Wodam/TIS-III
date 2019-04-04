// REQUIRES
// Middleware for requests
const bodyParser = require('body-parser');
// Requests logger
const morgan = require('morgan');
// Router
const express = require('express')();
// Database
const database = require('./common/database');

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
express.use(require('./communications/rest/routes'));

// START SERVER
express.listen(port, async (err) => {
  console.log(`Server is running at ${port}`);

	database.connect();
});
