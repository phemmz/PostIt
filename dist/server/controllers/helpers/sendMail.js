'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sends Mail
 * @param {*} email
 * @param {*} priority
 * @param {*} messagecreator
 * @param {*} groupname
 * @param {*} username
 * @param {*} req
 * @param {*} res
 * @returns {*} void
 */
exports.default = function (email, priority, messagecreator, groupname, username, req, res) {
  var appURL = 'https://phemmz-post-it.herokuapp.com/dashboard';
  var transporter = _nodemailer2.default.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD
    }
  });
  var mailOptions = {
    from: process.env.NM_EMAIL,
    to: email,
    subject: 'New ' + priority + ' message from ' + messagecreator + ' in ' + groupname + ' group',
    html: '<p>Hello, ' + username + '!</p>    <p>' + messagecreator + ' just posted a new ' + priority + ' message in ' + groupname + ' POSTIT group.</p>    <p>You can view the message here: <a href="' + appURL + '">POSTIT</a></p>'
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: 'Error sending email to ' + email
      });
    } else {
      res.status(200).json({
        confirmation: 'success',
        message: 'Notification Sent!!'
      });
    }
  });
};