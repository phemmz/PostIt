'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = require('../data/models').Users;
/**
 * This class CRUD functions for adding users to a group
 */

var UserCtrl = function () {
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);
  }

  _createClass(UserCtrl, null, [{
    key: 'addUser',

    /**
     * This method add a user to a particular group
     * @param {object} req 
     * @param {object} res 
     */
    value: function addUser(req, res) {
      // console.log("this one na test",req.body);
      User.create({
        username: req.body.username,
        groupId: req.params.groupId
      }).then(function (user) {
        res.json({
          message: 'User added successfully',
          result: user
        });
      }).catch(function (err) {
        // console.log(err);
        res.json({
          message: 'Cant add user to group',
          error: err
        });
      });
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