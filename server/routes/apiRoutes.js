const accountController = require('../controllers').accountController;
const groupController = require('../controllers').groupController;
const messageController = require('../controllers').messageController;
const userController = require('../controllers').userController;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the PostIt API!!',
	}));

	app.post('/api/user/signup', accountController.create);
	app.post('/api/user/signin', accountController.create)
	app.post('/api/group', groupController.create);
	app.post('/api/group/:groupId/message', messageController.create);
	app.post('/api/group/:groupId/user', userController.create);
	app.get('/api/group/:groupId/messages', messageController.retrieve);
};