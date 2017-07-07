'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';


var Account = require('../data/models').Account;
// const hashPassword = require('../data/models').hashPassword;
var bcrypt = require('bcrypt-nodejs');

/**
 * 
 */

var AccountCtrl = function () {
  function AccountCtrl() {
    _classCallCheck(this, AccountCtrl);
  }

  _createClass(AccountCtrl, null, [{
    key: 'signup',

    /**
     * This class 
     * @param {object} req 
     * @param {object} res 
     */
    value: function signup(req, res) {
      Account.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(function (account) {
        return res.status(201).send(account);
      }).catch(function (error) {
        return console.log(error);
      }); //res.status(400).send(error));
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      console.log(req.body);
      req.session.username = req.body.username;
      Account.findAll({
        where: {
          username: req.body.username
        }
      }).then(function (account) {
        var userdetails = JSON.stringify(account);
        // console.log(userdetails);
        userdetails = JSON.parse(userdetails);
        // console.log(userdetails);
        // console.log(userdetails[0].password);
        if (bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
          req.session.user = req.body.userdetails;
          // req.session.id = userdetails[0].id;
          res.json({
            message: 'Login successful'
          });
        } else {
          res.json({
            message: 'Check your login details'
          });
        }
      }).catch(function (error) {
        console.log(error);
        res.json({
          message: 'Invalid signin details'
        });
      });
    }
  }]);

  return AccountCtrl;
}();

// function validateInput(data) {
//   let errors = {};

//   if (Validator.isEmpty(data.username)) {
//     errors.username = 'This field is required';
//   }
//   if (Validator.isEmpty(data.email)) {
//     errors.email = 'This field is required';
//   }
//   if (!Validator.isEmail(data.email)) {
//     errors.email = 'Email is invalid';
//   }
//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'This is field is required';
//   }
//   if (Validator.isEmpty(data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'This is field is required';
//   }
//   if (!Validator.equals(data.password, data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'Passwords must match';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   }
// }
// exports.create = function (req, res) {
//   // const {errors, isValid} = validateInput(req.body);
//   // if (!isValid) {
//   //   res.status(400).json(errors);
//   // } 
//   console.log(req.body)
//   return Account
//     .create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     })
//     .then(account => res.status(201).send(account))
//     .catch(error => res.status(400).send(error));  
// };

// exports.retrieve = function (req, res) {
//   // console.log(req.body);
//   // req.session.username = req.body.username;
//   return Account.findAll({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then((account) => {
//       let userdetails = JSON.stringify(account);
//       // console.log(userdetails);
//       userdetails = JSON.parse(userdetails);
//       // console.log(userdetails);
//       // console.log(userdetails[0].password);
//       if (bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
//         req.session.user = req.body.userdetails;
//         // req.session.id = userdetails[0].id;
//         res.json({
//           message: 'Login successful'
//         });
//       } else {
//         res.json({
//           message: 'Check your login details'
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({
//         message: 'Invalid signin details'
//       });
//     });
// };


exports.default = AccountCtrl;