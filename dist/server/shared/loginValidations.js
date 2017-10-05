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
 * sharedSigninValidations class
 */
var sharedSigninValidations = function () {
  function sharedSigninValidations() {
    _classCallCheck(this, sharedSigninValidations);
  }

  _createClass(sharedSigninValidations, null, [{
    key: 'validateSignin',

    /**
     * validateSignin() takes in the data from the body for login and validates them
     * @param {object} userDetails
     * @returns {object} errors,isValid
     */
    value: function validateSignin(userDetails) {
      var errors = {};
      if (!userDetails.username) {
        errors.username = 'Please fill in your username';
      }
      if (userDetails.username) {
        if (_validator2.default.isEmpty(userDetails.username.trim())) {
          errors.username = 'Please fill in your username';
        }
      }
      if (!userDetails.password) {
        errors.password = 'Please fill in your password';
      }
      if (userDetails.password) {
        if (_validator2.default.isEmpty(userDetails.password.trim())) {
          errors.password = 'Please fill in your password';
        }
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return sharedSigninValidations;
}();

exports.default = sharedSigninValidations;