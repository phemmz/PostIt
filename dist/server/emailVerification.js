'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mailFormat;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mailFormat(req, res) {
  var transporter = _nodemailer2.default.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD
    }
  });
  var mailOptions = {
    from: process.env.NM_EMAIL,
    to: req.body.inviteeEmail,
    subject: "Reset password instructions",
    html: '<p>Hello, ' + req.body.inviteeName + '!</p>    <p>Someone has requested a link to change your password. You can do this through the link below.</p>    <p>Your Verification code is ' + req.body.verificationCode + '</p>    <p><a href="' + req.body.gameURL + '">Change my password</a></p><br /><br />    <p>If you didn\'t request this, please ignore this email,    <a href="phemmz-post-it.herokuapp.com">POSTIT</a></p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.json({
        success: false,
        message: 'Error sending email to ' + req.body.inviteeName
      });
    } else {
      console.log('Message sent: ' + info.response);
      res.json({
        success: true,
        message: 'Email sent to ' + req.body.inviteeName + '!'
      });
    }
  });
}