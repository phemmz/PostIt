import nodemailer from 'nodemailer';

/**
 * @description helper function for sending mail
 * @param {*} email
 * @param {*} priority
 * @param {*} messagecreator
 * @param {*} groupname
 * @param {*} username
 * @param {*} request
 * @param {*} response
 * @returns {*} void
 */
export default (email, priority, messagecreator,
  groupname, username, request, response) => {
  const appURL = 'https://phemmz-post-it.herokuapp.com/dashboard';
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.NM_EMAIL,
    to: email,
    subject:
      `New ${priority} message from ${messagecreator} in ${groupname} group`,
    html: `<p>Hello, ${username}!</p>\
    <p>${messagecreator} just posted a new ${priority}
    message in ${groupname} POSTIT group.</p>\
    <p>You can view the message here: <a href="${appURL}">POSTIT</a></p>`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      response.json({
        confirmation: 'fail',
        message: `Error sending email to ${email}`
      });
    } else {
      response.status(200).json({
        confirmation: 'success',
        message: 'Notification Sent!!'
      });
    }
  });
};
