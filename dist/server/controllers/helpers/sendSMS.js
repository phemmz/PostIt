'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeJusibe = require('node-jusibe');

var _nodeJusibe2 = _interopRequireDefault(_nodeJusibe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sends Mail
 * @param {*} phoneNumber
 * @param {*} messagecreator
 * @param {*} priority
 * @param {*} groupname
 * @param {*} req
 * @param {*} res
 * @returns {*} void
 */
exports.default = function (phoneNumber, messagecreator, priority, groupname, req, res) {
  var jusibeSDK = new _nodeJusibe2.default(process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN);
  var params = {
    to: phoneNumber,
    from: 'Post It',
    message: messagecreator + ' just posted a new ' + priority + ' message in ' + groupname + ' POSTIT group.'
  };
  jusibeSDK.sendMessage(params).then(function () {
    res.status(200).json({
      confirmation: 'success',
      message: 'Notification Sent!!'
    });
  }).catch(function () {
    res.status(400).json({
      confirmation: 'fail',
      message: 'Notification Failed!!'
    });
  });
};