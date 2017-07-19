'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * This class is in charge of signup and signin
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * This method creates a new account for a new user
     * @param {object} req
     * @param {object} res
     */
    value: function signup(req, res) {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(function () {
        req.session.username = req.body.username;
        res.status(201).json({
          confirmation: 'success',
          message: req.body.username + ' successfully created'
        });
      }).catch(function () {
        return res.status(400).json({
          confirmation: 'fail',
          message: 'Check input details'
        });
      });
    }

    /**
     * This method logs in a user
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      User.findAll({
        where: {
          username: req.body.username
        }
      }).then(function (account) {
        var userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (req.body.username && req.body.password && _bcryptNodejs2.default.compareSync(req.body.password, userdetails[0].password) === true) {
          req.session.username = req.body.username;
          req.session.userId = userdetails[0].id;
          res.json({
            confirmation: 'success',
            message: req.body.username + ' logged in'
          });
        } else {
          res.status(401).json({
            confirmation: 'fail',
            message: 'Check your login details'
          });
        }
      }).catch(function (err) {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Login failed'
        });
      });
    }
    /**
     * This method gets all the registered users in the application
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      if (req.session.username) {
        User.findAll({}).then(function (data) {
          res.json({
            confirmation: 'success',
            result: data
          });
        }).catch(function (error) {
          res.json({
            confirmation: 'fail',
            result: error
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'You are not logged in'
        });
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;