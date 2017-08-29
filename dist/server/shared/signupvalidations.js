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
 * sharedSignupValidations class
 */
var sharedSignupValidations = function () {
  function sharedSignupValidations() {
    _classCallCheck(this, sharedSignupValidations);
  }

  _createClass(sharedSignupValidations, null, [{
    key: 'commonValidations',

    /**
     * commonValidations() takes in the data from the body for signup and validates them
     * @param {object} data
     * @return {object} errors
     * @returns {object} errors,isValid
     */
    value: function commonValidations(data) {
      var errors = {};
      if (!data.username) {
        errors.username = 'Please fill in your username';
      }
      if (data.username) {
        if (_validator2.default.isEmpty(data.username.trim())) {
          errors.username = 'Please fill in your username';
        }
      }
      if (!data.phoneNumber) {
        errors.phoneNumber = 'Please fill in your phone number';
      }
      if (data.phoneNumber) {
        if (_validator2.default.isEmpty(data.phoneNumber.trim())) {
          errors.phoneNumber = 'Please fill in your username';
        }
      }
      if (!data.email) {
        errors.email = 'Please fill in your email';
      }
      if (data.email && !_validator2.default.isEmail(data.email)) {
        errors.email = 'Email is invalid';
      }
      if (!data.password) {
        errors.password = 'Please fill in your password';
      }
      if (data.password) {
        if (_validator2.default.isEmpty(data.password.trim())) {
          errors.password = 'Please fill in your password';
        }
      }
      if (data.passwordConfirmation) {
        if (_validator2.default.isEmpty(data.passwordConfirmation.trim())) {
          errors.password = 'This field is required';
        }
      }
      if (data.password && data.password.length <= 5) {
        errors.password = 'Password length must not be less than 6 characters';
      }
      if (!data.passwordConfirmation) {
        errors.passwordConfirmation = 'Please fill in your password';
      }
      if (data.password && data.passwordConfirmation) {
        if (data.password.trim() !== data.passwordConfirmation.trim()) {
          errors.passwordConfirmation = 'Passwords must match!!';
        }
      }
      if (!data.passwordConfirmation) {
        errors.invalid = 'Please fill in your details';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return sharedSignupValidations;
}();

exports.default = sharedSignupValidations;