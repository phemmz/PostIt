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
 * @class MessageValidations
 */
var MessageValidations = function () {
  function MessageValidations() {
    _classCallCheck(this, MessageValidations);
  }

  _createClass(MessageValidations, null, [{
    key: 'validateSendMessage',

    /**
     * @description validateSendMessage validates user input fields
     * @param {object} messageDetails
     * @returns {object} errors, isValid
     */
    value: function validateSendMessage(messageDetails) {
      var errors = {};
      if (messageDetails.content === '' || messageDetails.content === null) {
        errors.content = 'Message content is required';
      }
      if (!messageDetails.content || !messageDetails.priority) {
        errors.invalid = 'Please fill the required parameters';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return MessageValidations;
}();

exports.default = MessageValidations;