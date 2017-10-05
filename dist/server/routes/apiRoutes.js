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

var _GroupValidations = require('../controllers/middlewares/GroupValidations');

var _GroupValidations2 = _interopRequireDefault(_GroupValidations);

var _UserValidations = require('../controllers/middlewares/UserValidations');

var _UserValidations2 = _interopRequireDefault(_UserValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new express router
 */
var router = _express2.default.Router();
/**
 * Router for getting all the registered users in the application
 */
router.get('/api/v1/user', _UserValidations2.default.authenticate, _userController2.default.getAllUsers);
/**
 * Router for identifying a particular user either by username,
 * phone number or email
 */
router.get('/api/v1/user/:identifier', _userController2.default.getOne);
/**
 * Router for signup
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signup', _userController2.default.signup);
/**
 * Router for signin
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signin', _userController2.default.signin);
/**
 * Post router for creating a group
 * Takes authenticate and validateUserInput middlewares
 * authenticate verifies the jwtoken and
 * sets the user details to currentUser if authentication is valid
 */
router.post('/api/v1/group', _UserValidations2.default.authenticate, _groupController2.default.createGroup);
/**
 * Router to get all the group(s) a user belongs to
 * Takes authenticate middleware to verify the token
 */
router.get('/api/v1/group', _UserValidations2.default.authenticate, _groupController2.default.getGroup);
/**
 * Router to post message to a particular group
 * Takes authenticate, validateUserInput and isGroupMember middlewares
 * authenticate verifies token
 * validateUserInput validates user input
 * isGroupMember checks if the user belongs to the group
 */
router.post('/api/v1/group/:groupId/message', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _messageController2.default.sendMessage);
/**
 * Router to get all messages in a particular group
 * Takes the authenticate and isGroupMember middlewares
 */
router.get('/api/v1/group/:groupId/messages', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _messageController2.default.getMessages);
/**
 * Router to add a user to a particular group
 * Takes the authenticate, validateUserInput and isGroupMember middlewares
 */
router.post('/api/v1/group/:groupId/user', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _groupController2.default.addUserToGroup);
/**
 * Router for resetting password
 * Takes a middleware that validates user input
 */
router.post('/api/v1/reset', _userController2.default.resetPassword);
/**
 * Router for updating password field
 * Takes a middleware that validates user input
 */
router.put('/api/v1/user/signup', _userController2.default.updatePassword);
/**
 * Google callback url.
 */
router.post('/api/v1/auth/google', _userController2.default.googleSignup);
router.post('/api/v1/group/:groupId/readStatus', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _messageController2.default.readStatus);
router.get('/api/v1/group/:groupId/readStatus', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _messageController2.default.readList);
router.get('/api/v1/search/:searchKey/:offset/:perPage', _UserValidations2.default.authenticate, _userController2.default.searchUsers);
router.get('/api/v1/members/:groupId/:offset/:perPage', _UserValidations2.default.authenticate, _GroupValidations2.default.isGroupMember, _groupController2.default.groupMembers);
exports.default = router;