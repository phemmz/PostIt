const express = require('express');
const router = express.Router();

module.exports = (app) => {
	app.get('/', (req, res, next) => {
		res.render('index', { title: 'PostIt' });
	});
}

