'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resetValidations = require('../../shared/resetValidations');

var _resetValidations2 = _interopRequireDefault(_resetValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UpdatePasswordValidations class
 */
var UpdatePasswordValidations = function () {
  function UpdatePasswordValidations() {
    _classCallCheck(this, UpdatePasswordValidations);
  }

  _createClass(UpdatePasswordValidations, null, [{
    key: 'validateUserInput',

    /**
     * validateUserInput()
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */
    value: function validateUserInput(req, res, next) {
      var _sharedResetValidatio = _resetValidations2.default.commonValidations(req.body),
          errors = _sharedResetValidatio.errors,
          isValid = _sharedResetValidatio.isValid;

      if (!isValid) {
        res.status(422).json(errors);
      } else {
        next();
      }
    }
  }]);

  return UpdatePasswordValidations;
}();

exports.default = UpdatePasswordValidations;