'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _models = require('../../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * @class Validations
 */

var Validations = function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, null, [{
    key: 'authenticate',


    /**
     * @description This function verifies the token
     * @param {*} request
     * @param {*} response
     * @param {*} next
     * @returns {object} json
     */
    value: function authenticate(request, response, next) {
      var authorizationHeader = request.headers.authorization;
      var token = void 0;
      if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
      }
      /**
       * @description Checks if there is token and verifies the token
       * Should return decoded if token is valid
       */
      if (token) {
        _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
          if (err) {
            response.status(401).json({
              error: 'Failed to authenticate'
            });
          } else {
            User.findOne({
              where: {
                $or: [{ id: decoded.userId }, { email: decoded.email }]
              }
            }).then(function (user) {
              if (!user) {
                response.status(404).json({
                  error: 'No such user'
                });
              } else {
                request.currentUser = {
                  email: user.email,
                  username: user.username,
                  id: user.id
                };
                next();
              }
            });
          }
        });
      } else {
        response.status(403).json({
          error: 'Please signin/signup'
        });
      }
    }
    /**
     * @description validateSignup() validates user inputs for signup
     * and also checks if the username and email already exist on the database
     * @param {*} userData
     * @param {*} otherValidations
     * @returns {object} json
     */

  }, {
    key: 'validateSignup',
    value: function validateSignup(userData, otherValidations) {
      /**
       * @description Deconstruct all errors from otherValidations
       */
      var _otherValidations = otherValidations(userData),
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
          username: userData.username
        }
      }).then(function (user) {
        if (user) {
          errors.username = 'Another user exist with this username';
        }
      }),
      /**
       * @description Checks if the email already exists
       */
      User.findOne({
        where: {
          email: userData.email
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
     * @description validates users input fields
     * @param {object} groupDetails
     * @returns {object} errors,isValid
     */

  }, {
    key: 'validateCreateGroup',
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
  }]);

  return Validations;
}();

exports.default = Validations;