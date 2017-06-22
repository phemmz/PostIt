'use strict';

var accountController = require('../controllers').accountController;
var groupController = require('../controllers').groupController;
var messageController = require('../controllers').messageController;
var userController = require('../controllers').userController;

//const signinController = require('../controllers').signinController;
// import {groupController} from '../controllers/groupController.js';
// import {messageController} from '../controllers/messageController.js';
// import {userController} from '../controllers/userController.js';

module.exports = function (app) {
	app.get('/api', function (req, res) {
		return res.status(200).send({
			message: 'Welcome to the PostIt API!!'
		});
	});

	app.post('/api/user/signup', accountController.create);
	app.post('/api/user/signin', accountController.retrieve);
	app.post('/api/group', groupController.create);
	app.post('/api/group/:groupId/message', messageController.create);
	app.post('/api/group/:groupId/user', userController.create);
	app.get('/api/group/:groupId/messages', messageController.retrieve);
};