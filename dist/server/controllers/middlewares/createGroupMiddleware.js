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
 * @description CreateGroupValidations class
 */
var CreateGroupValidations = function () {
  function CreateGroupValidations() {
    _classCallCheck(this, CreateGroupValidations);
  }

  _createClass(CreateGroupValidations, null, [{
    key: 'validateCreateGroup',

    /**
     * @description validates users input fields
     * @param {object} groupDetails
     * @returns {object} errors,isValid
     */
    value: function validateCreateGroup(groupDetails) {
      var errors = {};
      if (groupDetails.groupname) {
        if (_validator2.default.isEmpty(groupDetails.groupname.trim())) {
          errors.groupname = 'Please fill in your groupname';
        }
      }
      if (!groupDetails.groupname) {
        errors.invalid = 'Please fill in your details';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
    /**
     * @description validateUserInput()
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */
    // static validateUserInput(req, res, next) {
    //   const { errors, isValid } =
    //     CreateGroupValidations.validateCreateGroup(req.body);
    //   if (!isValid) {
    //     res.status(422).json({
    //       errors
    //     });
    //   } else {
    //     next();
    //   }
    // }

  }]);

  return CreateGroupValidations;
}();

exports.default = CreateGroupValidations;