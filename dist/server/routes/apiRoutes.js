'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('./../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

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
router.get('/api/v1/user', _authenticate2.default, _userController2.default.getAllUsers);
/**
 * Router for identifying a particular user either by username, phone number or email
 */
router.get('/api/v1/user/:identifier', _userController2.default.getOne);
/**
 * Router for signup
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signup', _signupMiddleware2.default.validateUserInput, _userController2.default.signup);
/**
 * Router for signin
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signin', _signinMiddleware2.default.validateUserInput, _userController2.default.signin);
/**
 * Post router for creating a group
 * Takes authenticate and validateUserInput middlewares
 * authenticate verifies the jwtoken and
 * sets the user details to currentUser if authentication is valid
 */
router.post('/api/v1/group', _authenticate2.default, _createGroupMiddleware2.default.validateUserInput, _groupController2.default.createGroup);
/**
 * Router to get all the group(s) a user belongs to
 * Takes authenticate middleware to verify the token
 */
router.get('/api/v1/group', _authenticate2.default, _groupController2.default.getGroup);
/**
 * Router to post message to a particular group
 * Takes authenticate, validateUserInput and isGroupMember middlewares
 * authenticate verifies token
 * validateUserInput validates user input
 * isGroupMember checks if the user belongs to the group
 */
router.post('/api/v1/group/:groupId/message', _authenticate2.default, _sendMessageMiddleware2.default.validateUserInput, _checkUserInGroup2.default.isGroupMember, _messageController2.default.sendMessage);
/**
 * Router to get all messages in a particular group
 * Takes the authenticate and isGroupMember middlewares
 */
router.get('/api/v1/group/:groupId/messages', _authenticate2.default, _checkUserInGroup2.default.isGroupMember, _messageController2.default.getMessages);
/**
 * Router to add a user to a particular group
 * Takes the authenticate, validateUserInput and isGroupMember middlewares
 */
router.post('/api/v1/group/:groupId/user', _authenticate2.default, _addUserMiddleware2.default.validateUserInput, _checkUserInGroup2.default.isGroupMember, _groupController2.default.addUserToGroup);
/**
 * Router for resetting password
 * Takes a middleware that validates user input
 */
router.post('/api/v1/reset', _resetMiddleware2.default.validateUserInput, _userController2.default.resetPassword);
/**
 * Router for updating password field
 * Takes a middleware that validates user input
 */
router.put('/api/v1/user/signup', _updatePasswordMiddleware2.default.validateUserInput, _userController2.default.updatePassword);
/**
 * Google callback url.
 */
router.post('/api/v1/auth/google', _userController2.default.googleSignup);
router.post('/api/v1/group/:groupId/readStatus', _authenticate2.default, _messageController2.default.readStatus);
router.get('/api/v1/group/:groupId/readStatus', _authenticate2.default, _messageController2.default.readList);
router.get('/api/v1/search/:searchKey/:offset/:perPage', _authenticate2.default, _userController2.default.searchUsers);
router.get('/api/v1/members/:groupId/:offset/:perPage', _authenticate2.default, _groupController2.default.groupMembers);
exports.default = router;