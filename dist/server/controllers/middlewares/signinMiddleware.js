'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loginValidations = require('../../shared/loginValidations');

var _loginValidations2 = _interopRequireDefault(_loginValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description SigninValidations class
 */
var SigninValidations = function () {
  function SigninValidations() {
    _classCallCheck(this, SigninValidations);
  }

  _createClass(SigninValidations, null, [{
    key: 'validateUserInput',

    /**
     * @description validates User Input
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */
    value: function validateUserInput(req, res, next) {
      var _sharedSigninValidati = _loginValidations2.default.validateSignin(req.body),
          errors = _sharedSigninValidati.errors,
          isValid = _sharedSigninValidati.isValid;

      if (!isValid) {
        res.status(422).json({
          errors: errors
        });
      } else {
        next();
      }
    }
  }]);

  return SigninValidations;
}();

exports.default = SigninValidations;