const accountController = require('../controllers').accountController;
const groupController = require('../controllers').groupController;
const messageController = require('../controllers').messageController;
const userController = require('../controllers').userController;


// const signinController = require('../controllers').signinController;
// import {groupController} from '../controllers/groupController.js';
// import {messageController} from '../controllers/messageController.js';
// import {userController} from '../controllers/userController.js';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIt API!!',
  }));

  app.post('/api/user/signup', accountController.create);
  app.post('/api/user/signin', accountController.retrieve);
  app.post('/api/group', groupController.create);
  app.get('/api/group', groupController.retrieve);
  app.post('/api/group/:groupId/message', messageController.create);
  app.post('/api/group/:groupId/user', userController.create);
  app.get('/api/group/:groupId/messages', messageController.retrieve);
};
