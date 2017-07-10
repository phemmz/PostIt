'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 */
var SendMessageValidations = function () {
  function SendMessageValidations() {
    _classCallCheck(this, SendMessageValidations);
  }

  _createClass(SendMessageValidations, null, [{
    key: 'validateSendMessage',

    /**
     * 
     * @param {object} data 
     */
    value: function validateSendMessage(data) {
      var errors = {};
      if (data.content === '' || data.content === null) {
        errors.username = 'Message content is required';
      }
      if (!data.content || !data.priority) {
        errors.invalid = 'Please fill the required parameters';
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
      var _SendMessageValidatio = SendMessageValidations.validateSendMessage(req.body),
          errors = _SendMessageValidatio.errors,
          isValid = _SendMessageValidatio.isValid;

      if (!isValid) {
        res.status(422).json(errors);
      } else {
        next();
      }
    }
  }]);

  return SendMessageValidations;
}();

exports.default = SendMessageValidations;