import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import util from 'util';
import nodemailer from 'nodemailer';
import shortid from 'shortid';
import Models from '../data/models';
import UserValidations from './middlewares/UserValidations';
import sharedSignupValidations from '../shared/signupvalidations';
import sharedSigninValidations from '../shared/loginValidations';
import sharedResetValidations from '../shared/resetValidations';

const User = Models.User;

/**
 * @description This class is in charge of signup, signin and getting all users
 */
export default class UserController {
  /**
   * @description This method creates a new account for a new user
   * @param {object} request - request
   * @param {object} response - response
   * @returns {object} json
   */
  static signup(request, response) {
    UserValidations.validateSignup(request.body,
      sharedSignupValidations.commonValidations)
      .then(({ errors, isValid }) => {
        if (!isValid) {
          response.status(422).json({
            errors
          });
        } else {
          /**
           * @description Creates a new user with the User model
           */
          User
            .create({
              username: request.body.username,
              email: request.body.email,
              password: request.body.password,
              phoneNumber: request.body.phoneNumber
            })
            .then((account) => {
              /**
               * @description if successful JSON.stringify turns account array
               * into JSON text and stores that JSON text in a string
               * then JSON.parse turns the string of JSON text
               * into a Javascript object then you can get the first object
               * in the array by doing userdetails[0]
               */
              let userdetails = JSON.stringify(account);
              userdetails = JSON.parse(userdetails);
              /**
               * This generates the token by encoding the
               * userdetails passed into it. It joins the resulting encoded
               * strings together with a period (.) in between them.
               * The token is generated in the format header.payload.signature
               */
              const token = jwt.sign({
                userId: userdetails.id,
                username: userdetails.username,
                email: userdetails.email
              }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24
              });
              /**
               * If user is created successfully
               * return a json object with status 201
               */
              response.status(201).json({
                confirmation: 'success',
                message: `${request.body.username} successfully created`,
                token
              });
            })
            /**
             * Catch error block returns a json object,
             * with status 400
             */
            .catch(() => {
              response.status(400).json({
                confirmation: 'fail',
                message: 'Check input details'
              });
            });
        }
      });
  }

  /**
   * @description This method is for signin a user in
   * @param {*} request
   * @param {*} response
   * @returns {object} json
   */
  static signin(request, response) {
    const { errors, isValid } =
      sharedSigninValidations.validateSignin(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      /**
       * Select all data from the user model where
       * username is equal to username entered into the input field
       */
      User.findAll({
        where: {
          $or: [
            { username: request.body.username },
            { email: request.body.email }
          ]
        }
      })
      .then((account) => {
        /**
         * if successful JSON.stringify turns account array
         * into JSON text and stores that JSON text in a string
         * then JSON.parse turns the string of JSON text into a Javascript
         * object then you can get the first object in the array by doing
         * userdetails[0]
         */
        let userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (request.body.username && request.body.password &&
        bcrypt.compareSync(
          request.body.password, userdetails[0].password) === true) {
          /**
           * This generates the token by encoding the userdetails passed into it
           * It joins the resulting encoded strings together with a period (.)
           * in between them. The token is generated in the format
           * header.payload.signature
           */
          const token = jwt.sign({
            userId: userdetails[0].id,
            username: userdetails[0].username,
            email: userdetails[0].email
          }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
          });
          /**
           * Returns a json object including the token generated
           */
          response.json({
            confirmation: 'success',
            message: `${request.body.username} logged in`,
            token
          });
        } else {
          /**
           * Returns a json object with status 401,
           * if the password entered is not equal to the password
           * in the database
           */
          response.status(401).json({
            errors: {
              confirmation: 'fail',
              message: 'Check your login details'
            }
          });
        }
      })
      /**
       * Catch error block returns a json object with status 401,
       * Error is generated when the username entered cant be found
       * in the database
       */
      .catch(() => {
        response.status(401).json(
          {
            errors: {
              confirmation: 'fail',
              message: 'Invalid Username'
            }
          }
        );
      });
    }
  }
  /**
   * @description Checks the email from the google authentication if it exist
   * If it does, it logs the user in and generate token
   * else, it creates a new user, with the google details
   * @param {*} request
   * @param {*} response
   * @returns {*} json
   */
  static googleSignup(request, response) {
    User.findOne({
      where: {
        email: request.body.email
      }
    })
      .then((user) => {
        if (user === null) {
          UserController.signup(request, response);
        } else {
          const token = jwt.sign({
            username: request.body.username,
            email: request.body.email,
          }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
          });
          /**
           * Returns a json object including the token generated
           */
          response.status(200).json({
            confirmation: 'success',
            message: `${request.body.username} logged in`,
            token
          });
        }
      })
      .catch((err) => {
        response.json({
          confirmation: 'fail',
          message: err
        });
      });
  }
/**
 * @description This method gets all the registered users in the application
 * @param {object} request
 * @param {object} response
 * @returns {object} json
 */
  static getAllUsers(request, response) {
/**
 * Queries the User model for all users
 */
    User.findAll({})
      .then((allUsers) => {
        const data = [];
        allUsers.map((user) => {
          return data.push({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
          });
        });
/**
 * Returns a json object with the data array passed along
 */
        response.json({
          confirmation: 'success',
          result: data
        });
      })
/**
 * Error block
 */
      .catch((error) => {
        response.json({
          confirmation: 'fail',
          result: error
        });
      });
  }
/**
 * @description Gets just one user
 * @param {*} request
 * @param {*} response
 * @returns {object} json
 */
  static getOne(request, response) {
/**
 * Queries the User model for just one user
 * where it is either username or email
 */
    User.findOne({
      where: {
        $or: [
          { username: request.params.identifier },
          { email: request.params.identifier },
          { phoneNumber: request.params.identifier },
          { verificationCode: request.params.identifier }
        ]
      }
    })
      .then((user) => {
        response.json({ user: {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          verificationCode: user.verificationCode }
        });
      })
      .catch((err) => {
        response.json(err);
      });
  }
  /**
   * @description resetPassword generates a verification code using shortid
   * It also sends a mail to the user which contains the verification code
   * @param {*} request
   * @param {*} response
   * @return {*} json
   */
  static resetPassword(request, response) {
    const { errors, isValid } =
      UserValidations.validateResetPassword(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      User.findOne({
        where: {
          username: request.body.username
        }
      })
      .then((user) => {
        if (user === null) {
          response.status(404).json({
            confirmation: 'fail',
            message: 'User not found'
          });
        } else {
          const generatedId = shortid.generate();
          const gameURL = 'https://phemmz-post-it.herokuapp.com/verification';
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
            html: `<p>Hello, ${request.body.username}!</p>\
            <p>Someone has requested a link to change your password.
            You can do this through the link below.</p>\
            <p><strong>Your Verification code is:</strong> ${generatedId}</p>\
            <p><a href="${gameURL}">Change my password</a></p><br /><br />\
            <p>If you didn't request this, please ignore this email</p>\
            <p>You can post messages with friends on 
            <a href="phemmz-post-it.herokuapp.com">POSTIT</a></p>`
          };
          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              response.status(422).json({
                confirmation: 'fail',
                message: `Error sending email to ${request.body.username}`
              });
            } else {
              response.status(200).json({
                confirmation: 'success',
                message: 'You will receive an email with instructions on how to reset your password in a few minutes.' // eslint-disable-line
              });
              user.update({
                verificationCode: generatedId
              }, {
                where: {
                  username: request.body.username
                }
              });
            }
          });
        }
      })
      .catch((err) => {
        response.status(500).json({
          confirmation: 'fail',
          err
        });
      });
    }
  }
  /**
   * @description Updates the password of a user in the database
   * @param {*} request
   * @param {*} response
   * @return {*} json
   */
  static updatePassword(request, response) {
    const { errors, isValid } =
      sharedResetValidations.commonValidations(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      const hashedPassword = bcrypt.hashSync(request.body.password);
      User.findOne({
        where: {
          username: request.body.username
        }
      })
      .then((user) => {
        user.update({
          password: hashedPassword
        }, {
          where: {
            username: request.body.username
          }
        })
          .then(() => {
            response.status(200).json({
              confirmation: 'success',
              message: 'Password updated successfully'
            });
          })
          .catch(() => {
            response.status(400).json({
              confirmation: 'fail',
              message: 'Failed to update password'
            });
          });
      })
      .catch(() => {
        response.status(404).json({
          confirmation: 'fail',
          message: 'User not found'
        });
      });
    }
  }
  /**
   * @description search for Users
   * @param {*} request
   * @param {*} response
   * @returns {*} json
   */
  static searchUsers(request, response) {
    User.findAll({
      where: {
        username: {
          $iLike: `%${request.params.searchKey}%`
        }
      }
    })
      .then((results) => {
        const userDetails = [];
        results.map((user) => {
          return userDetails.push({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
          });
        });
        const PER_PAGE = 5;
        const offset =
          request.params.offset ? parseInt(request.params.offset, 10) : 0;
        const nextOffset = (offset + PER_PAGE);
        const previousOffset =
          (offset - PER_PAGE < 1) ? 0 : (offset - PER_PAGE);
        const metaData = {
          limit: PER_PAGE,
          next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
          offset: request.params.offset,
          previous: util.format(
            '?limit=%s&offset=%s', PER_PAGE, previousOffset),
          total_count: userDetails.length
        };
        const getPaginatedItems =
          userDetails.slice(offset, (offset + PER_PAGE));
        response.status(200).json({
          confirmation: 'success',
          metaData,
          searchedUsers: getPaginatedItems
        });
      })
      .catch((error) => {
        response.status(404).json({
          confirmation: 'fail',
          error
        });
      });
  }
}
