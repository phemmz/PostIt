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
  /**
   * 
   */
  function Validations() {
    _classCallCheck(this, Validations);

    this.errors = {};
  }
  /**
   * 
   * @param {object} data 
   */


  _createClass(Validations, [{
    key: 'validateInput',
    value: function validateInput(data) {
      if (!data.username || !data.email || !data.password || !data.passwordConfirmation) {
        this.errors.invalid = 'Invalid input details';
        console.log("test1");
      }
      if (data.username === null || data.username === ' ') {
        console.log("test2");
        this.errors.username = 'Please fill in your username';
      }
      if (data.email === null || data.email === ' ') {
        console.log("test3");
        this.errors.email = 'Please fill in your email';
      }
      if (data.email && !_validator2.default.isEmail(data.email)) {
        console.log("test4");
        this.errors.email = 'Email is invalid';
      }
      if (data.password === null || data.password === '') {
        console.log("test5");
        this.errors.password = 'Please fill in your password';
      }
      if (data.password && data.password.length <= 5) {
        console.log("test6");
        this.errors.password = 'Password length must not be less than 6';
      }
      if (data.password === '' || data.password === null) {
        console.log("test7");
        this.errors.passwordConfirmation = 'This field is required';
      }
      if (data.password !== data.passwordConfirmation) {
        console.log("test8");
        this.errors.passwordConfirmation = 'Passwords must match!!';
      }

      return {
        errors: this.errors,
        isValid: (0, _isEmpty2.default)(this.errors)
      };
    }
  }]);

  return Validations;
}();

exports.default = Validations;