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
 * AddUserValidations class
 */
var AddUserValidations = function () {
  function AddUserValidations() {
    _classCallCheck(this, AddUserValidations);
  }

  _createClass(AddUserValidations, null, [{
    key: 'validateAddUser',

    /**
     * validateAddUser()
     * @param {object} data
     * @returns {object} errors,isValid
     */
    value: function validateAddUser(data) {
      var errors = {};
      if (data.username) {
        if (_validator2.default.isEmpty(data.username.trim())) {
          errors.username = 'Username is required';
        }
      }
      if (!data.username) {
        errors.invalid = 'Please fill in your details oahhjqj';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
    /**
     * validateUserInput
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */

  }, {
    key: 'validateUserInput',
    value: function validateUserInput(req, res, next) {
      var _AddUserValidations$v = AddUserValidations.validateAddUser(req.body),
          errors = _AddUserValidations$v.errors,
          isValid = _AddUserValidations$v.isValid;

      if (!isValid) {
        res.status(422).json(errors);
      } else {
        next();
      }
    }
  }]);

  return AddUserValidations;
}();

exports.default = AddUserValidations;