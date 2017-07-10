'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 */
var SigninValidations = function () {
  function SigninValidations() {
    _classCallCheck(this, SigninValidations);
  }

  _createClass(SigninValidations, null, [{
    key: 'validateSignin',

    /**
     * 
     * @param {object} data 
     */
    value: function validateSignin(data) {
      var errors = {};
      if (data.username) {
        if (_validator2.default.isEmpty(data.username.trim())) {
          errors.username = 'Please fill in your username';
        }
      }
      if (data.password) {
        if (_validator2.default.isEmpty(data.password.trim())) {
          errors.password = 'Please fill in your password';
        }
      }
      if (!data.username || !data.password) {
        errors.invalid = 'Please fill in your details';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

  }, {
    key: 'validateUserInput',
    value: function validateUserInput(req, res, next) {
      var _SigninValidations$va = SigninValidations.validateSignin(req.body),
          errors = _SigninValidations$va.errors,
          isValid = _SigninValidations$va.isValid;

      if (!isValid) {
        res.status(422).json(errors);
      } else {
        next();
      }
    }
  }]);

  return SigninValidations;
}();

exports.default = SigninValidations;