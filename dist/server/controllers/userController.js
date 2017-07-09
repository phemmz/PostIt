'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.Users;
var Account = _models2.default.Account;
var Group = _models2.default.Group;
/**
 * This class CRUD functions for adding users to a group
 */

var UserCtrl = function () {
  /**
   * 
   */
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);

    this.error = '';
    this.userInGroup = false;
    this.userValid = false;
  }
  /**
   * 
   * @param {*} username 
   * @param {*} groupId 
   */


  _createClass(UserCtrl, null, [{
    key: 'checkUserInGroup',
    value: function checkUserInGroup(uname, gId) {
      var _this = this;

      this.username = uname;
      User.findOne({
        where: {
          username: uname,
          groupId: gId
        }
      }).then(function (user) {
        _this.userInGroup = true;
        JSON.stringify(user);
      });
    }
    /**
     * 
     * @param {*} uname 
     */

  }, {
    key: 'checkUserValidity',
    value: function checkUserValidity(uname) {
      Account.findOne({
        where: {
          username: uname
        }
      }).then(function () {
        UserCtrl.userValid = true;
      });
    }
    /**
     * This method add a user to a particular group
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'addUser',
    value: function addUser(req, res) {
      if (req.session.username) {
        UserCtrl.checkUserInGroup(req.body.uname);
        UserCtrl.checkUserValidity(req.body.uname);
        if (UserCtrl.userValid === false) {
          res.status(400).json({
            confirmation: 'fail',
            message: 'User does not exist'
          });
        } else if (UserCtrl.userInGroup === true) {
          res.json({
            confirmation: 'fail',
            message: 'User has already been added to the group'
          });
        } else {
          User.create({
            username: req.body.username,
            groupname: req.body.groupname,
            groupId: req.params.groupId
          }).then(function (user) {
            res.json({
              message: 'User added successfully',
              result: user
            });
          }).catch(function (err) {
            res.json({
              message: 'Cant add user to group',
              error: err
            });
          });
        }
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please log in to add a user to a group'
        });
      }
    }

    /**
    * 
    * @param {object} req 
    * @param {object} res 
    */

  }, {
    key: 'getGroup',
    value: function getGroup(req, res) {
      var user = req.session.username;
      if (req.session.username) {
        User.findAll({
          where: {
            username: user
          }
        }).then(function (group) {
          res.json({
            confirmation: 'success',
            results: group
          });
        }).catch(function (error) {
          res.json({
            confirmation: 'fail',
            message: error
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please log in'
        });
      }
    }
  }]);

  return UserCtrl;
}();
// exports.create = function (req, res) {
//   // if(req.session.name) {
//   // console.log(req.body);
//   // console.log(req.params.groupId);
//   return User
//     .create({
//       username: req.body.username,
//       groupId: req.params.groupId
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({ message: 'Cant add user to group' });
//     })
//     .then((user) => {
//       res.json({
//         message: 'User added successfully',
//         result: user
//       });
//     });

// }
//  else {
//    res.json({
//      message: "You need to login to add user"
//    });
//  }
// };


exports.default = UserCtrl;