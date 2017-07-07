'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import models from '../data/models/index';
var Group = require('../data/models').Group;

/**
 * 
 */

var GroupCtrl = function () {
  function GroupCtrl() {
    _classCallCheck(this, GroupCtrl);
  }

  _createClass(GroupCtrl, null, [{
    key: 'createGroup',

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */
    value: function createGroup(req, res) {
      console.log(req.body);
      Group.create({
        groupname: req.body.groupname
      }).then(function (group) {
        res.json({
          confirmation: 'success',
          result: group
        });
      }).catch(function (error) {
        // console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'getGroup',
    value: function getGroup(req, res) {
      Group.findAll({}).then(function (group) {
        res.json({
          confirmation: 'success',
          results: group
        });
      }).catch(function (error) {
        console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
    }
  }]);

  return GroupCtrl;
}();
// exports.create = function (req, res) {
// console.log(req.body);
// console.log(req.session.user);
// if (req.session.user) {
//   return Group
//     .create({
//       groupname: req.body.groupname,
//     })
//     .catch((error) => {
//       // console.log(error);
//       res.json({
//         confirmation: 'fail',
//         message: error
//       });
//     })
//     .then((group) => {
//       res.json({
//         confirmation: 'success',
//         result: group
//       });
//     });
// };
// exports.retrieve = function (req, res) {
//   // req.session.username = req.body.username;
//   return Group.findAll({})
//     .then((group) => {
//       res.json({
//         confirmation: 'success',
//         results: group
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({
//         confirmation: 'fail',
//         message: error
//       });
//     });
// };
// // }
// // else {
// //   res.json({
// //     message: "You need to login to create a group"
// //   });
// // }


exports.default = GroupCtrl;