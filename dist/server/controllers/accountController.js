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
// const Group = Models.Group;

/**
 * 
 */

var UserController = function () {
  /**
   * 
   */
  function UserController() {
    _classCallCheck(this, UserController);

    this.isOnline = false;
    this.userValid = true;
    this.userInGroup = false;
  }
  /**
   * 
   * @param {*} username 
   * @param {*} groupId 
   */


  _createClass(UserController, null, [{
    key: 'checkUserInGroup',
    value: function checkUserInGroup(uname, gId) {
      var _this = this;

      User.findOne({
        where: {
          username: uname,
          groupId: gId
        }
      }).then(function () {
        _this.userInGroup = true;
      });
    }
    /**
     * This class 
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'signup',
    value: function signup(req, res) {
      req.session.status = false;
      if (req.session.status === true) {
        res.status(500).json({
          error: 'You already have an account'
        });
      } else {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }).then(function (account) {
          req.session.user = req.body.username;
          // req.session.userId = account[0].id;
          res.status(201).json({
            confirmation: 'success',
            message: req.body.username + ' successfully added',
            result: account
          });
        }).catch(function () {
          return res.status(400).json({
            confirmation: 'fail',
            message: 'Check input details'
          });
        });
      }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      req.session.username = req.body.username;
      User.findAll({
        where: {
          username: req.body.username
        }
      }).then(function (account) {
        var userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (req.body.username && req.body.password && _bcryptNodejs2.default.compareSync(req.body.password, userdetails[0].password) === true) {
          req.session.user = req.body.username;
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
      }).catch(function () {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Login failed!'
        });
      });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
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
    }
  }]);

  return UserController;
}();

exports.default = UserController;