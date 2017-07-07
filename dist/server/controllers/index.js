'use strict';

var accountController = require('./accountController');
var groupController = require('./groupController');
var userController = require('./userController');
var messageController = require('./messageController');
var signinController = require('./messageController');

module.exports = {
  accountController: accountController,
  groupController: groupController,
  userController: userController,
  messageController: messageController,
  signinController: signinController
};