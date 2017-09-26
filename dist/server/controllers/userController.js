'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * @description This class is in charge of signup, signin and getting all users
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * @description This method creates a new account for a new user
     * @param {object} req - request
     * @param {object} res - response
     * @returns {object} json
     */
    value: function signup(req, res) {
      /**
       * @description Creates a new user with the User model
       */
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
      }).then(function (account) {
        /**
         * @description if successful JSON.stringify turns account array
         * into JSON text and stores that JSON text in a string
         * then JSON.parse turns the string of JSON text into a Javascript object
         * then you can get the first object in the array by doing userdetails[0]
         */
        var userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        /**
         * This generates the token by encoding the userdetails passed into it
         * It joins the resulting encoded strings together with a period (.)
         * in between them. The token is generated in the format
         * header.payload.signature
         */
        var token = _jsonwebtoken2.default.sign({
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
        res.status(201).json({
          confirmation: 'success',
          message: req.body.username + ' successfully created',
          token: token
        });
      })
      /**
       * Catch error block returns a json object,
       * with status 400
       */
      .catch(function () {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Check input details'
        });
      });
    }

    /**
     * @description This method is for signin a user in
     * @param {*} req
     * @param {*} res
     * @returns {object} json
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      /**
       * Select all data from the user model where
       * username is equal to username entered into the input field
       */
      User.findAll({
        where: {
          $or: [{ username: req.body.username }, { email: req.body.email }]
        }
      }).then(function (account) {
        /**
         * if successful JSON.stringify turns account array
         * into JSON text and stores that JSON text in a string
         * then JSON.parse turns the string of JSON text into a Javascript object
         * then you can get the first object in the array by doing userdetails[0]
         */
        var userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (req.body.username && req.body.password && _bcryptNodejs2.default.compareSync(req.body.password, userdetails[0].password) === true) {
          /**
           * This generates the token by encoding the userdetails passed into it
           * It joins the resulting encoded strings together with a period (.)
           * in between them. The token is generated in the format
           * header.payload.signature
           */
          var token = _jsonwebtoken2.default.sign({
            userId: userdetails[0].id,
            username: userdetails[0].username,
            email: userdetails[0].email
          }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
          });
          /**
           * Returns a json object including the token generated
           */
          res.json({
            confirmation: 'success',
            message: req.body.username + ' logged in',
            token: token
          });
        } else {
          /**
           * Returns a json object with status 401,
           * if the password entered is not equal to the password in the database
           */
          res.status(401).json({ errors: {
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
      .catch(function () {
        res.status(401).json({
          errors: {
            confirmation: 'fail',
            message: 'Invalid Username'
          }
        });
      });
    }
    /**
     * @description Checks the email from the google authentication if it exist
     * If it does, it logs the user in and generate token
     * else, it creates a new user, with the google details
     * @param {*} req
     * @param {*} res
     * @returns {*} json
     */

  }, {
    key: 'googleSignup',
    value: function googleSignup(req, res) {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user) {
        if (user === null) {
          UserController.signup(req, res);
        } else {
          var token = _jsonwebtoken2.default.sign({
            username: req.body.username,
            email: req.body.email
          }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
          });
          /**
           * Returns a json object including the token generated
           */
          res.status(200).json({
            confirmation: 'success',
            message: req.body.username + ' logged in',
            token: token
          });
        }
      }).catch(function (err) {
        res.json({
          confirmation: 'fail',
          message: err
        });
      });
    }
    /**
     * @description This method gets all the registered users in the application
     * @param {object} req
     * @param {object} res
     * @returns {object} json
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      /**
       * Queries the User model for all users
       */
      User.findAll({}).then(function (allUsers) {
        var data = [];
        allUsers.map(function (user) {
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
        res.json({
          confirmation: 'success',
          result: data
        });
      })
      /**
       * Error block
       */
      .catch(function (error) {
        res.json({
          confirmation: 'fail',
          result: error
        });
      });
    }
    /**
     * @description Gets just one user
     * @param {*} req
     * @param {*} res
     * @returns {object} json
     */

  }, {
    key: 'getOne',
    value: function getOne(req, res) {
      /**
       * Queries the User model for just one user
       * where it is either username or email
       */
      User.findOne({
        where: {
          $or: [{ username: req.params.identifier }, { email: req.params.identifier }, { phoneNumber: req.params.identifier }, { verificationCode: req.params.identifier }]
        }
      }).then(function (user) {
        res.json({ user: {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            verificationCode: user.verificationCode }
        });
      }).catch(function (err) {
        res.json(err);
      });
    }
    /**
     * @description resetPassword generates a verification code using shortid
     * It also sends a mail to the user which contains the verification code
     * @param {*} req
     * @param {*} res
     * @return {*} json
     */

  }, {
    key: 'resetPassword',
    value: function resetPassword(req, res) {
      User.findOne({
        where: {
          username: req.body.username
        }
      }).then(function (user) {
        if (user === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'User not found'
          });
        } else {
          var generatedId = _shortid2.default.generate();
          var gameURL = 'https://phemmz-post-it.herokuapp.com/verification';
          var transporter = _nodemailer2.default.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.NM_EMAIL,
              pass: process.env.NM_PASSWORD
            }
          });
          var mailOptions = {
            from: process.env.NM_EMAIL,
            to: user.email,
            subject: 'Reset password instructions',
            html: '<p>Hello, ' + req.body.username + '!</p>          <p>Someone has requested a link to change your password.\n           You can do this through the link below.</p>          <p><strong>Your Verification code is:</strong> ' + generatedId + '</p>          <p><a href="' + gameURL + '">Change my password</a></p><br /><br />          <p>If you didn\'t request this, please ignore this email</p>          <p>You can post messages with friends on \n          <a href="phemmz-post-it.herokuapp.com">POSTIT</a></p>'
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              res.status(422).json({
                confirmation: 'fail',
                message: 'Error sending email to ' + req.body.username
              });
            } else {
              res.status(200).json({
                confirmation: 'success',
                message: 'You will receive an email with instructions on how to reset your password in a few minutes.' // eslint-disable-line
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
      }).catch(function (err) {
        res.status(500).json({
          confirmation: 'fail',
          err: err
        });
      });
    }
    /**
     * @description Updates the password of a user in the database
     * @param {*} req
     * @param {*} res
     * @return {*} json
     */

  }, {
    key: 'updatePassword',
    value: function updatePassword(req, res) {
      var hashedPassword = _bcryptNodejs2.default.hashSync(req.body.password);
      User.findOne({
        where: {
          username: req.body.username
        }
      }).then(function (user) {
        user.update({
          password: hashedPassword
        }, {
          where: {
            username: req.body.username
          }
        }).then(function () {
          res.status(200).json({
            confirmation: 'success',
            message: 'Password updated successfully'
          });
        }).catch(function () {
          res.status(400).json({
            confirmation: 'fail',
            message: 'Failed to update password'
          });
        });
      }).catch(function () {
        res.status(404).json({
          confirmation: 'fail',
          message: 'User not found'
        });
      });
    }
    /**
     * @description search for Users
     * @param {*} req
     * @param {*} res
     * @returns {*} json
     */

  }, {
    key: 'searchUsers',
    value: function searchUsers(req, res) {
      User.findAll({
        where: {
          username: {
            $iLike: '%' + req.params.searchKey + '%'
          }
        }
      }).then(function (response) {
        var userDetails = [];
        response.map(function (user) {
          return userDetails.push({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
          });
        });
        var PER_PAGE = 5;
        var offset = req.params.offset ? parseInt(req.params.offset, 10) : 0;
        var nextOffset = offset + PER_PAGE;
        var previousOffset = offset - PER_PAGE < 1 ? 0 : offset - PER_PAGE;
        var metaData = {
          limit: PER_PAGE,
          next: _util2.default.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
          offset: req.params.offset,
          previous: _util2.default.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
          total_count: userDetails.length
        };
        var getPaginatedItems = userDetails.slice(offset, offset + PER_PAGE);
        res.status(200).json({
          confirmation: 'success',
          metaData: metaData,
          searchedUsers: getPaginatedItems
        });
      }).catch(function (error) {
        res.status(404).json({
          confirmation: 'fail',
          error: error
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;