'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = require('../data/models').Account;
// const hashPassword = require('../data/models').hashPassword;
var bcrypt = require('bcrypt-nodejs');

function validateInput(data) {
  var errors = {};

  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (_validator2.default.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!_validator2.default.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'This is field is required';
  }
  if (_validator2.default.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This is field is required';
  }
  if (!_validator2.default.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}

exports.create = function (req, res) {
  var _validateInput = validateInput(req.body),
      errors = _validateInput.errors,
      isValid = _validateInput.isValid;

  if (!isValid) {
    res.status(400).json(errors);
  }
  return Account.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function (account) {
    return res.status(201).send(account);
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};

exports.retrieve = function (req, res) {
  // console.log(req.body);
  // req.session.username = req.body.username;
  return Account.findAll({
    where: {
      username: req.body.username
    }
  }).then(function (account) {
    var userdetails = JSON.stringify(account);
    // console.log(userdetails);
    userdetails = JSON.parse(userdetails);
    // console.log(userdetails);
    // console.log(userdetails[0].password);
    if (bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
      req.session.user = req.body.userdetails;
      // req.session.id = userdetails[0].id;
      res.json({
        message: 'Login successful'
      });
    } else {
      res.json({
        message: 'Check your login details'
      });
    }
  }).catch(function (error) {
    console.log(error);
    res.json({
      message: 'Invalid signin details'
    });
  });
};