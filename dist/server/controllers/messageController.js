'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = _models2.default.Message;
var User = _models2.default.User;
var Group = _models2.default.Group;

/**
 * 
 */

var MessageController = function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: 'sendMessage',

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */
    value: function sendMessage(req, res) {
      Group.findOne({
        where: { id: req.params.groupId }
      }).then(function (group) {
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          User.findOne({
            where: { username: req.session.username }
          }).then(function (user) {
            Message.create({
              content: req.body.content,
              readcheck: req.body.readcheck,
              priority: req.body.priority,
              groupId: req.params.groupId,
              userId: user.id
            }).then(function () {
              res.status(201).json({
                confirmation: 'success',
                message: 'Message sent'
              });
            }).catch(function () {
              res.status(400).json({
                confirmation: 'fail',
                message: 'Message failed'
              });
            });
          });
        }
      });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'getMessages',
    value: function getMessages(req, res) {
      if (req.session.username) {
        Message.findAll({
          where: { groupId: req.params.groupId }
        }).then(function (messages) {
          if (messages.length < 1) {
            res.status(404).json({
              confirmation: 'fail',
              message: 'No message found'
            });
          } else {
            res.status(200).json({
              confirmation: 'success',
              results: messages
            });
          }
        }).catch(function (error) {
          res.json({
            confirmation: 'fail',
            message: error
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'You are not logged in'
        });
      }
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;