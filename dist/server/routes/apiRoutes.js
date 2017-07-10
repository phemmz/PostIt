'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _accountController = require('./../controllers/accountController');

var _accountController2 = _interopRequireDefault(_accountController);

var _groupController = require('./../controllers/groupController');

var _groupController2 = _interopRequireDefault(_groupController);

var _messageController = require('./../controllers/messageController');

var _messageController2 = _interopRequireDefault(_messageController);

var _userController = require('./../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _signupMiddleware = require('../controllers/middlewares/signupMiddleware');

var _signupMiddleware2 = _interopRequireDefault(_signupMiddleware);

var _signinMiddleware = require('../controllers/middlewares/signinMiddleware');

var _signinMiddleware2 = _interopRequireDefault(_signinMiddleware);

var _createGroupMiddleware = require('../controllers/middlewares/createGroupMiddleware');

var _createGroupMiddleware2 = _interopRequireDefault(_createGroupMiddleware);

var _addUserMiddleware = require('../controllers/middlewares/addUserMiddleware');

var _addUserMiddleware2 = _interopRequireDefault(_addUserMiddleware);

var _sendMessageMiddleware = require('../controllers/middlewares/sendMessageMiddleware');

var _sendMessageMiddleware2 = _interopRequireDefault(_sendMessageMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/user', _accountController2.default.getAll);
router.post('/api/user/signup', _signupMiddleware2.default.validateUserInput, _accountController2.default.signup);
router.post('/api/user/signin', _signinMiddleware2.default.validateUserInput, _accountController2.default.signin);
router.post('/api/group', _createGroupMiddleware2.default.validateUserInput, _groupController2.default.createGroup);
router.get('/api/group', _userController2.default.getGroup);
router.post('/api/group/:groupId/message', _sendMessageMiddleware2.default.validateUserInput, _messageController2.default.sendMessage);
router.get('/api/group/:groupId/messages', _messageController2.default.getMessages);
router.post('/api/group/:groupId/user', _addUserMiddleware2.default.validateUserInput, _userController2.default.addUser);

exports.default = router;