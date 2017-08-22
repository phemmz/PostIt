'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _signupvalidations = require('../../shared/signupvalidations');

var _signupvalidations2 = _interopRequireDefault(_signupvalidations);

var _models = require('../../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * SignupValidations class
 */

var SignupValidations = function () {
  function SignupValidations() {
    _classCallCheck(this, SignupValidations);
  }

  _createClass(SignupValidations, null, [{
    key: 'validateInput',

    /**
     * validateInput() validates user inputs for signup
     * and also checks if the username and email already exist on the database
     * @param {*} data
     * @param {*} otherValidations
     * @returns {object} json
     */
    value: function validateInput(data, otherValidations) {
      /**
       * Deconstruct all errors from otherValidations
       */
      var _otherValidations = otherValidations(data),
          errors = _otherValidations.errors;
      /**
       * Promise.all returns a single promise for the 2 database calls
       */


      return _bluebird2.default.all([
      /**
       * Checks if the username already exists
       */
      User.findOne({
        where: {
          username: data.username
        }
      }).then(function (user) {
        if (user) {
          errors.username = 'Another user exist with this username';
        }
      }),
      /**
       * Checks if the email already exists
       */
      User.findOne({
        where: {
          email: data.email
        }
      }).then(function (user) {
        if (user) {
          errors.email = 'Another user exist with this email';
        }
      })]).then(function () {
        return {
          errors: errors,
          isValid: (0, _isEmpty2.default)(errors)
        };
      });
    }
    /**
     * validateUserInput()
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */

  }, {
    key: 'validateUserInput',
    value: function validateUserInput(req, res, next) {
      SignupValidations.validateInput(req.body, _signupvalidations2.default.commonValidations).then(function (_ref) {
        var errors = _ref.errors,
            isValid = _ref.isValid;

        if (!isValid) {
          res.status(422).json(errors);
        } else {
          next();
        }
      });
    }
  }]);

  return SignupValidations;
}();

exports.default = SignupValidations;