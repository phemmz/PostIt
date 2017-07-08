'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = require('../data/models').Messages;

/**
 * 
 */

var MessageCtrl = function () {
  function MessageCtrl() {
    _classCallCheck(this, MessageCtrl);
  }

  _createClass(MessageCtrl, null, [{
    key: 'sendMessage',

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */
    value: function sendMessage(req, res) {
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
        // console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
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
      return Message.findAll({
        where: { groupId: req.params.groupId }
      }).then(function (messages) {
        var msg = JSON.stringify(messages);
        msg = JSON.parse(msg);
        res.json(msg);
      }).catch(function (error) {
        console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
    }
  }]);

  return MessageCtrl;
}();
// exports.create = function (req, res) {
// console.log(req.body);
// console.log(req.params.groupId);
// if(req.session.name) {
// return Message
//   .create({
//     content: req.body.content,
//     readcheck: req.body.readcheck,
//     priority: req.body.priority,
//     groupId: req.params.groupId,
//   })
//   .catch((error) => {
//     console.log(error);
//     res.json({
//       confirmation: 'fail',
//       message: error
//     });
//   })
//   .then((message) => {
//     res.json({
//       confirmation: 'success',
//       result: message
//     });
//   });

// }
// else {
//  res.json({
//   message: "Login to send message"
//  });
// }
// };

// exports.retrieve = function (req, res) {
//   // if(req.session.name) {
//   return Message.findAll({
//     where: { groupId: req.params.groupId }
//   })
//     .then((messages) => {
//       let msg = JSON.stringify(messages);
//       msg = JSON.parse(msg);
//       res.json(msg);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({
//         confirmation: 'fail',
//         message: error
//       });
//     });

// }
// else {
//  res.json({
//    message: "Login to get messages"
//  });
// }
// };


exports.default = MessageCtrl;