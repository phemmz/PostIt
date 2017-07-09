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
var Validations = function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, [{
    key: 'validateInput',

    /**
     * 
     * @param {object} data 
     */
    value: function validateInput(data) {
      var errors = {};
      if (!data.username || !data.password || !data.username) {
        this.errors.invalid = 'Invalid input details';
      }
      if (_validator2.default.isEmpty(data.username) || data.username === '' || data.username === null) {
        this.errors.username = 'Please fill in your username';
      }
      if (_validator2.default.isEmpty(data.email) || data.email === null || data.email === '') {
        this.errors.email = 'Please fill in your email';
      }
      if (!_validator2.default.isEmail(data.email)) {
        this.errors.email = 'Email is invalid';
      }
      if (data.password === null || data.password === '') {
        this.errors.password = 'Please fill in your password';
      }
      if (data.password.length <= 5) {
        this.errors.password = 'Password length must not be less than 6';
      }
      if (data.password === '' || data.password === null) {
        this.errors.passwordConfirmation = 'This field is required';
      }
      if (data.password !== data.passwordConfirmation) {
        this.errors.passwordConfirmation = 'Passwords must match';
      }

      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return Validations;
}();

exports.default = Validations;