'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = _models2.default.Messages;

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
      if (req.session.username) {
        Message.create({
          content: req.body.content,
          readcheck: req.body.readcheck,
          priority: req.body.priority,
          groupId: req.params.groupId
        }).then(function (message) {
          res.json({
            confirmation: 'success',
            result: message
          });
        }).catch(function (error) {
          res.json({
            confirmation: 'fail',
            message: error
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please log in to send a message'
        });
      }
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
        return Message.findAll({
          where: { groupId: req.params.groupId }
        }).then(function (messages) {
          var msg = JSON.stringify(messages);
          msg = JSON.parse(msg);
          res.json(msg);
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