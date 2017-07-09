'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import Acc from '../data/models';


var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _middleware = require('./middlewares/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = require('../data/models').Account;
// const Account = Acc.Account;
var validate = new _middleware2.default();

/**
 * 
 */

var AccountCtrl = function () {
  /**
   * 
   */
  function AccountCtrl() {
    _classCallCheck(this, AccountCtrl);

    this.isOnline = false;
    this.userValid = true;
  }
  /**
   * This class 
   * @param {object} req 
   * @param {object} res 
   */


  _createClass(AccountCtrl, null, [{
    key: 'signup',
    value: function signup(req, res) {
      var _validate$validateInp = validate.validateInput(req.body),
          errors = _validate$validateInp.errors,
          isValid = _validate$validateInp.isValid;

      req.session.status = false;
      req.session.username = req.body.username;
      if (!isValid) {
        res.status(400).json(errors);
      } else if (req.session.status === true) {
        res.status(500).json({
          error: 'You already have an account'
        });
      } else {
        Account.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }).then(function (account) {
          return res.status(201).json({
            confirmation: 'success',
            message: req.body.username + ' successfully added',
            result: account
          });
        }).catch(function () {
          return res.json({
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
      Account.findAll({
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
      }).catch(function (error) {
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      Account.findAll({}).then(function (data) {
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

  return AccountCtrl;
}();

exports.default = AccountCtrl;