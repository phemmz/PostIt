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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express');
// const Account = require('../data/models').Account;
// const Group = require('../data/models').Group;
var router = _express2.default.Router();

router.post('/api/user/signup', _accountController2.default.signup);
router.post('/api/user/signin', _accountController2.default.signin);
router.post('/api/group', _groupController2.default.createGroup);
router.get('/api/group', _groupController2.default.getGroup);
router.post('/api/group/:groupId/message', _messageController2.default.sendMessage);
router.get('/api/group/:groupId/messages', _messageController2.default.getMessages);
router.post('/api/group/:groupId/user', _userController2.default.addUser);
// GroupCtrl.createGroup);

exports.default = router;