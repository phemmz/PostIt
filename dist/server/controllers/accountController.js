'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * This class is in charge of signup, signin and getting all users
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * This method creates a new account for a new user
     * @param {object} req - request
     * @param {object} res - response
     * @returns {object} json
     */
    value: function signup(req, res) {
      /**
       * Creates a new user with the User model
       */
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(function () {
        /**
         * If user is created successfully,
         * set req.session.username to the username entered
         * and return a json object with status 201
         */
        req.session.username = req.body.username;
        res.status(201).json({
          confirmation: 'success',
          message: req.body.username + ' successfully created'
        });
      })
      /**
       * Catch error block returns a json object,
       * with status 400
       */
      .catch(function () {
        return res.status(400).json({
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

  }, {
    key: 'signin',
    value: function signin(req, res) {
      /**
       * Select all data from the user model where
       * username is equal to username entered into the input field
       */
      User.findAll({
        where: {
          username: req.body.username
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
           * It joins the resulting encoded strings together with a period (.) in between them
           * The token is generated in the format header.payload.signature
           */
          var token = _jsonwebtoken2.default.sign({
            userId: userdetails[0].id,
            username: userdetails[0].username
          }, process.env.SECRET);
          req.session.username = req.body.username;
          req.session.userId = userdetails[0].id;
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
            message: 'Login failed'
          }
        });
      });
    }
    /**
     * This method gets all the registered users in the application
     * @param {object} req
     * @param {object} res
     * @returns {object} json
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      if (req.session.username) {
        /**
         * Queries the User model for all users
         */
        User.findAll({}).then(function (data) {
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
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'You are not logged in'
        });
      }
    }
    /**
     * Gets just one user
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
          $or: [{ username: req.params.identifier }, { email: req.params.identifier }]
        }
      }).then(function (user) {
        res.json({ user: {
            username: user.username,
            email: user.email }
        });
      }).catch(function (err) {
        res.json(err);
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;