'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
/**
 * @description This function verifies the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */

exports.default = function (req, res, next) {
  var authorizationHeader = req.headers.authorization;
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
        res.status(401).json({
          error: 'Failed to authenticate'
        });
      } else {
        User.findOne({
          where: {
            $or: [{ id: decoded.userId }, { email: decoded.email }]
          }
        }).then(function (user) {
          if (!user) {
            res.status(404).json({
              error: 'No such user'
            });
          } else {
            req.currentUser = {
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
    res.status(403).json({
      error: 'Please signin/signup'
    });
  }
};