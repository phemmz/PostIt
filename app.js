const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//Express app setup
const app = express();

//Morgan helps log all requests to the console
app.use(logger('dev'));

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setup a default catch-all route that sends back a welcome message in JSON format
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome!!!'
}));

module.exports = app;