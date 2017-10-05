'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _models = require('../../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = _models2.default.Group;

/**
 * @class GroupValidations
 */

var GroupValidations = function () {
  function GroupValidations() {
    _classCallCheck(this, GroupValidations);
  }

  _createClass(GroupValidations, null, [{
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
     * @description isGroupMember checks if a user belongs to a group
     * @param {*} request
     * @param {*} response
     * @param {*} next
     * @returns {object} json
     */

  }, {
    key: 'isGroupMember',
    value: function isGroupMember(request, response, next) {
      if (isNaN(request.params.groupId)) {
        response.status(422).json({
          error: {
            message: 'Invalid groupId supplied'
          }
        });
      } else {
        Group.findOne({ where: { id: request.params.groupId } }).then(function (group) {
          if (group === null) {
            return response.status(400).json({
              confirmation: 'fail',
              message: 'Group does not exist'
            });
          }
          group.getUsers({ where: { username: request.currentUser.username } }).then(function (user) {
            if (user.length < 1) {
              return response.status(400).json({
                confirmation: 'fail',
                message: 'You dont belong to this group'
              });
            }
            return next();
          });
        });
      }
    }
    /**
     * @description validates AddUser input fields
     * @param {object} userDetails
     * @returns {object} errors,isValid
     */

  }, {
    key: 'validateAddUser',
    value: function validateAddUser(userDetails) {
      var errors = {};
      if (userDetails.username) {
        if (_validator2.default.isEmpty(userDetails.username.trim())) {
          errors.username = 'Username is required';
        }
      }
      if (!userDetails.username) {
        errors.invalid = 'Please fill in your details';
      }
      return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return GroupValidations;
}();

exports.default = GroupValidations;