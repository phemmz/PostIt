'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

var _sendMail = require('./helpers/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

var _sendSMS = require('./helpers/sendSMS');

var _sendSMS2 = _interopRequireDefault(_sendSMS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = _models2.default.Message;
var User = _models2.default.User;
var Group = _models2.default.Group;
var View = _models2.default.View;

/**
 * MessageController class
 */

var MessageController = function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: 'sendMessage',

    /**
     * sendMessage() sends message to a particular group
     * @param {object} req
     * @param {object} res
     * @return {object} json
     */
    value: function sendMessage(req, res) {
      /**
       * Find the particular group by its id
       */
      Group.findOne({
        where: { id: req.params.groupId }
      }).then(function (group) {
        /**
         * Checks if the group exist
         */
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          /**
           * If the group exist,
           * Find the User
           */
          User.findOne({
            where: { username: req.currentUser.username }
          }).then(function (user) {
            group.getUsers({
              where: {}
            }).then(function (members) {
              Message.create({
                content: req.body.content,
                readcheck: req.body.readcheck,
                priority: req.body.priority,
                groupId: req.params.groupId,
                messagecreator: user.username,
                userId: user.id
              }).then(function (message) {
                req.app.io.emit('newMsg', 'New message from ' + message.messagecreator + ' in ' + group.groupname + ' group');
                members.map(function (member) {
                  if (message.priority === 'Urgent') {
                    if (member.username !== message.messagecreator) {
                      (0, _sendMail2.default)(member.email, message.priority, message.messagecreator, group.groupname, member.username, req, res);
                    }
                  } else if (message.priority === 'Critical') {
                    if (member.username !== message.messagecreator) {
                      (0, _sendMail2.default)(member.email, message.priority, message.messagecreator, group.groupname, member.username, req, res);
                      (0, _sendSMS2.default)(member.phoneNumber, message.messagecreator, message.priority, group.groupname);
                    }
                  }
                  return member;
                });
                res.status(201).json({
                  confirmation: 'success',
                  message: 'Message sent',
                  results: message,
                  groupMembers: members
                });
              }).catch(function (err) {
                res.status(400).json({
                  confirmation: 'fail',
                  message: err
                });
              });
            });
          });
        }
      });
    }
    /**
     * Get all messages in a group
     * @param {object} req
     * @param {object} res
     * @return {object} json
     */

  }, {
    key: 'getMessages',
    value: function getMessages(req, res) {
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
    }
    /**
     * readStatus
     * @param {*} req
     * @param {*} res
     * @return {*} void
     */

  }, {
    key: 'readStatus',
    value: function readStatus(req, res) {
      View.findOne({
        where: {
          groupId: req.params.groupId,
          username: req.currentUser.username
        }
      }).then(function (response) {
        if (response === null) {
          View.create({
            groupId: req.params.groupId,
            username: req.currentUser.username
          }).then(function (view) {
            res.status(201).json({
              confirmation: 'success',
              results: view
            });
          }).catch(function (err) {
            res.json({
              confirmation: 'fail',
              message: err
            });
          });
        } else {
          res.json({
            confirmation: 'success'
          });
        }
      });
    }
    /**
     * readList
     * @param {*} req
     * @param {*} res
     * @return {*} void
     */

  }, {
    key: 'readList',
    value: function readList(req, res) {
      View.findAll({
        where: { groupId: req.params.groupId }
      }).then(function (response) {
        var list = [];
        response.map(function (eachUser) {
          return list.push(eachUser.username);
        });
        var uniqueList = list.filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        });
        res.status(200).json({
          confirmation: 'success',
          uniqueList: uniqueList
        });
      }).catch(function () {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Invalid group id'
        });
      });
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;