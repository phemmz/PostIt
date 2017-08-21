import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import shortid from 'shortid';
import Models from '../data/models';

const User = Models.User;

/**
 * @description This class is in charge of signup, signin and getting all users
 */
export default class UserController {
/**
 * @description This method creates a new account for a new user
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} json
 */
  static signup(req, res) {
/**
 * @description Creates a new user with the User model
 */
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
      })
      .then((account) => {
/**
 * @description if successful JSON.stringify turns account array
 * into JSON text and stores that JSON text in a string
 * then JSON.parse turns the string of JSON text into a Javascript object
 * then you can get the first object in the array by doing userdetails[0]
 */
        let userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
/**
 * This generates the token by encoding the userdetails passed into it
 * It joins the resulting encoded strings together with a period (.) in between them
 * The token is generated in the format header.payload.signature
 */
        const token = jwt.sign({
          userId: userdetails.id,
          username: userdetails.username,
          email: userdetails.email
        }, process.env.SECRET);
/**
 * If user is created successfully
 * return a json object with status 201
 */
        res.status(201).json({
          confirmation: 'success',
          message: `${req.body.username} successfully created`,
          token
        });
      })
/**
 * Catch error block returns a json object,
 * with status 400
 */
      .catch(() => {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Check input details'
        });
      });
  }

/**
 * This method is for signin a user in
 * @param {*} req
 * @param {*} res
 * @returns {object} json
 */
  static signin(req, res) {
/**
 * Select all data from the user model where
 * username is equal to username entered into the input field
 */
    User.findAll({
      where: {
        username: req.body.username
      }
    })
      .then((account) => {
/**
 * if successful JSON.stringify turns account array
 * into JSON text and stores that JSON text in a string
 * then JSON.parse turns the string of JSON text into a Javascript object
 * then you can get the first object in the array by doing userdetails[0]
 */
        let userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (req.body.username && req.body.password &&
        bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
/**
 * This generates the token by encoding the userdetails passed into it
 * It joins the resulting encoded strings together with a period (.) in between them
 * The token is generated in the format header.payload.signature
 */
          const token = jwt.sign({
            userId: userdetails[0].id,
            username: userdetails[0].username,
            email: userdetails[0].email
          }, process.env.SECRET);
/**
 * Returns a json object including the token generated
 */
          res.json({
            confirmation: 'success',
            message: `${req.body.username} logged in`,
            token
          });
        } else {
/**
 * Returns a json object with status 401,
 * if the password entered is not equal to the password in the database
 */
          res.status(401).json({ errors:
          {
            confirmation: 'fail',
            message: 'Check your login details'
          }
          });
        }
      })
/**
 * Catch error block returns a json object with status 401,
 * Error is generated when the username entered cant be found in the database
 */
      .catch(() => {
        res.status(401).json(
          {
            errors: {
              confirmation: 'fail',
              message: 'Login failed'
            }
          }
        );
      });
  }
/**
 * This method gets all the registered users in the application
 * @param {object} req
 * @param {object} res
 * @returns {object} json
 */
  static getAllUsers(req, res) {
/**
 * Queries the User model for all users
 */
    User.findAll({})
      .then((data) => {
/**
 * Returns a json object with the data array passed along
 */
        res.json({
          confirmation: 'success',
          result: data
        });
      })
/**
 * Error block
 */
      .catch((error) => {
        res.json({
          confirmation: 'fail',
          result: error
        });
      });
  }
/**
 * Gets just one user
 * @param {*} req
 * @param {*} res
 * @returns {object} json
 */
  static getOne(req, res) {
/**
 * Queries the User model for just one user
 * where it is either username or email
 */
    User.findOne({
      where: {
        $or: [
          { username: req.params.identifier },
          { email: req.params.identifier },
          { phoneNumber: req.params.identifier },
          { verificationCode: req.params.identifier }
        ]
      }
    })
      .then((user) => {
        res.json({ user: {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          verificationCode: user.verificationCode }
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
  /**
   * resetPassword generates a verification code using shortid
   * It also sends a mail to the user which contains the verification code
   * @param {*} req
   * @param {*} res
   * @return {*} json
   */
  static resetPassword(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (user === null) {
        res.status(404).json({
          confirmation: 'fail',
          message: 'User not found'
        });
      } else {
        const generatedId = shortid.generate();
        const gameURL = 'https://phemmz-post-it.herokuapp.com/reset/verification';
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.NM_EMAIL,
            pass: process.env.NM_PASSWORD
          }
        });
        const mailOptions = {
          from: process.env.NM_EMAIL,
          to: user.email,
          subject: 'Reset password instructions',
          html: `<p>Hello, ${req.body.username}!</p>\
          <p>Someone has requested a link to change your password. You can do this through the link below.</p>\
          <p><strong>Your Verification code is:</strong> ${generatedId}</p>\
          <p><a href="${gameURL}">Change my password</a></p><br /><br />\
          <p>If you didn't request this, please ignore this email</p>\
          <p>You can post messages with friends on <a href="phemmz-post-it.herokuapp.com">POSTIT</a></p>`
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            res.json({
              confirmation: 'fail',
              message: `Error sending email to ${req.body.username}`
            });
          } else {
            res.status(200).json({
              confirmation: 'success',
              message: 'You will receive an email with instructions on how to reset your password in a few minutes.'
            });
            user.update({
              verificationCode: generatedId
            }, {
              where: {
                username: req.body.username
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        confirmation: 'fail',
        err
      });
    });
  }
  /**
   * This updates the password of a user in the database
   * @param {*} req
   * @param {*} res
   * @return {*} json
   */
  static updatePassword(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password);
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        user.update({
          password: hashedPassword
        }, {
          where: {
            username: req.body.username
          }
        })
          .then(() => {
            res.json({
              confirmation: 'success',
              message: 'Password updated successfully'
            });
          })
          .catch(() => {
            res.status(400).json({
              confirmation: 'fail',
              message: 'Failed to update password'
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          confirmation: 'fail',
          message: err
        });
      });
  }
}
