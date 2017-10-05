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

var _MessageValidations = require('./middlewares/MessageValidations');

var _MessageValidations2 = _interopRequireDefault(_MessageValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = _models2.default.Message;
var User = _models2.default.User;
var Group = _models2.default.Group;
var View = _models2.default.View;

/**
 * @description MessageController class
 */

var MessageController = function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: 'sendMessage',

    /**
     * @description It sends message to a particular group
     * @param {object} request
     * @param {object} response
     * @return {object} json
     */
    value: function sendMessage(request, response) {
      var _MessageValidations$v = _MessageValidations2.default.validateSendMessage(request.body),
          errors = _MessageValidations$v.errors,
          isValid = _MessageValidations$v.isValid;

      if (!isValid) {
        response.status(422).json({
          errors: errors
        });
      } else {
        /**
         * @description Find the particular group by its id
         */
        Group.findOne({
          where: { id: request.params.groupId }
        }).then(function (group) {
          /**
           * @description Checks if the group exist
           */
          if (group === null) {
            response.status(404).json({
              confirmation: 'fail',
              message: 'Group does not exist'
            });
          } else {
            /**
             * If the group exist,
             * Find the User
             */
            User.findOne({
              where: { username: request.currentUser.username }
            }).then(function (user) {
              group.getUsers({
                where: {}
              }).then(function (members) {
                Message.create({
                  content: request.body.content,
                  readcheck: request.body.readcheck,
                  priority: request.body.priority,
                  groupId: request.params.groupId,
                  messagecreator: user.username,
                  userId: user.id
                }).then(function (message) {
                  request.app.io.emit('newMsg', 'New message from\n                           ' + message.messagecreator + ' in ' + group.groupname + '\n                            group');
                  members.map(function (member) {
                    if (message.priority === 'Urgent') {
                      if (member.username !== message.messagecreator) {
                        (0, _sendMail2.default)(member.email, message.priority, message.messagecreator, group.groupname, member.username, request, response);
                      }
                    } else if (message.priority === 'Critical') {
                      if (member.username !== message.messagecreator) {
                        (0, _sendMail2.default)(member.email, message.priority, message.messagecreator, group.groupname, member.username, request, response);
                        (0, _sendSMS2.default)(member.phoneNumber, message.messagecreator, message.priority, group.groupname);
                      }
                    }
                    return member;
                  });
                  response.status(201).json({
                    confirmation: 'success',
                    message: 'Message sent',
                    results: message,
                    groupMembers: members
                  });
                }).catch(function (err) {
                  response.status(400).json({
                    confirmation: 'fail',
                    message: err
                  });
                });
              });
            });
          }
        });
      }
    }
    /**
     * @description it gets all messages in a group
     * @param {object} request
     * @param {object} response
     * @return {object} json
     */

  }, {
    key: 'getMessages',
    value: function getMessages(request, response) {
      Message.findAll({
        where: { groupId: request.params.groupId }
      }).then(function (messages) {
        if (messages.length < 1) {
          response.status(404).json({
            confirmation: 'fail',
            message: 'No message found'
          });
        } else {
          response.status(200).json({
            confirmation: 'success',
            results: messages
          });
        }
      }).catch(function (error) {
        response.json({
          confirmation: 'fail',
          message: error
        });
      });
    }
    /**
     * @description updates the readStatus after viewing a message
     * @param {*} request
     * @param {*} response
     * @return {*} void
     */

  }, {
    key: 'readStatus',
    value: function readStatus(request, response) {
      View.findOne({
        where: {
          groupId: request.params.groupId,
          username: request.currentUser.username
        }
      }).then(function (result) {
        if (result === null) {
          View.create({
            groupId: request.params.groupId,
            username: request.currentUser.username
          }).then(function (view) {
            response.status(201).json({
              confirmation: 'success',
              results: view
            });
          }).catch(function (err) {
            response.json({
              confirmation: 'fail',
              message: err
            });
          });
        } else {
          response.json({
            confirmation: 'success'
          });
        }
      });
    }
    /**
     * @description It gets all the people who have read a message
     * @param {*} request
     * @param {*} response
     * @return {*} void
     */

  }, {
    key: 'readList',
    value: function readList(request, response) {
      View.findAll({
        where: { groupId: request.params.groupId }
      }).then(function (results) {
        var list = [];
        results.map(function (eachUser) {
          return list.push(eachUser.username);
        });
        var uniqueList = list.filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        });
        response.status(200).json({
          confirmation: 'success',
          uniqueList: uniqueList
        });
      }).catch(function () {
        response.status(400).json({
          confirmation: 'fail',
          message: 'Invalid group id'
        });
      });
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;