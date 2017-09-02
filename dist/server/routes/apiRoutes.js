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

var _signupMiddleware = require('../controllers/middlewares/signupMiddleware');

var _signupMiddleware2 = _interopRequireDefault(_signupMiddleware);

var _signinMiddleware = require('../controllers/middlewares/signinMiddleware');

var _signinMiddleware2 = _interopRequireDefault(_signinMiddleware);

var _updatePasswordMiddleware = require('../controllers/middlewares/updatePasswordMiddleware');

var _updatePasswordMiddleware2 = _interopRequireDefault(_updatePasswordMiddleware);

var _createGroupMiddleware = require('../controllers/middlewares/createGroupMiddleware');

var _createGroupMiddleware2 = _interopRequireDefault(_createGroupMiddleware);

var _addUserMiddleware = require('../controllers/middlewares/addUserMiddleware');

var _addUserMiddleware2 = _interopRequireDefault(_addUserMiddleware);

var _checkUserInGroup = require('../controllers/middlewares/checkUserInGroup');

var _checkUserInGroup2 = _interopRequireDefault(_checkUserInGroup);

var _sendMessageMiddleware = require('../controllers/middlewares/sendMessageMiddleware');

var _sendMessageMiddleware2 = _interopRequireDefault(_sendMessageMiddleware);

var _authenticate = require('../controllers/middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _resetMiddleware = require('../controllers/middlewares/resetMiddleware');

var _resetMiddleware2 = _interopRequireDefault(_resetMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new express router
 */
var router = _express2.default.Router();
/**
 * Router for getting all the registered users in the application
 */
router.get('/api/user', _authenticate2.default, _accountController2.default.getAllUsers);
/**
 * Router for identifying a particular user either by username, phone number or email
 */
router.get('/api/user/:identifier', _accountController2.default.getOne);
/**
 * Router for signup
 * Takes a middleware that validates user input
 */
router.post('/api/user/signup', _signupMiddleware2.default.validateUserInput, _accountController2.default.signup);
/**
 * Router for signin
 * Takes a middleware that validates user input
 */
router.post('/api/user/signin', _signinMiddleware2.default.validateUserInput, _accountController2.default.signin);
/**
 * Post router for creating a group
 * Takes authenticate and validateUserInput middlewares
 * authenticate verifies the jwtoken and
 * sets the user details to currentUser if authentication is valid
 */
router.post('/api/group', _authenticate2.default, _createGroupMiddleware2.default.validateUserInput, _groupController2.default.createGroup);
/**
 * Router to get all the group(s) a user belongs to
 * Takes authenticate middleware to verify the token
 */
router.get('/api/group', _authenticate2.default, _groupController2.default.getGroup);
/**
 * Router to post message to a particular group
 * Takes authenticate, validateUserInput and isGroupMember middlewares
 * authenticate verifies token
 * validateUserInput validates user input
 * isGroupMember checks if the user belongs to the group
 */
router.post('/api/group/:groupId/message', _authenticate2.default, _sendMessageMiddleware2.default.validateUserInput, _checkUserInGroup2.default.isGroupMember, _messageController2.default.sendMessage);
/**
 * Router to get all messages in a particular group
 * Takes the authenticate and isGroupMember middlewares
 */
router.get('/api/group/:groupId/messages', _authenticate2.default, _checkUserInGroup2.default.isGroupMember, _messageController2.default.getMessages);
/**
 * Router to add a user to a particular group
 * Takes the authenticate, validateUserInput and isGroupMember middlewares
 */
router.post('/api/group/:groupId/user', _authenticate2.default, _addUserMiddleware2.default.validateUserInput, _checkUserInGroup2.default.isGroupMember, _groupController2.default.addUserToGroup);
/**
 * Router for resetting password
 * Takes a middleware that validates user input
 */
router.post('/api/reset', _resetMiddleware2.default.validateUserInput, _accountController2.default.resetPassword);
/**
 * Router for updating password field
 * Takes a middleware that validates user input
 */
router.put('/api/user/signup', _updatePasswordMiddleware2.default.validateUserInput, _accountController2.default.updatePassword);
/**
 * Google callback url.
 */
router.post('/api/auth/google', _accountController2.default.googleSignup);
router.post('/api/group/:groupId/readStatus', _authenticate2.default, _messageController2.default.readStatus);
router.get('/api/group/:groupId/readStatus', _authenticate2.default, _messageController2.default.readList);
router.get('/api/search/:searchKey', _authenticate2.default, _messageController2.default.searchUsers);

exports.default = router;