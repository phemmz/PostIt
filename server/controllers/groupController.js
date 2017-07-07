// import models from '../data/models/index';
const Group = require('../data/models').Group;

<<<<<<< HEAD
exports.create = function (req, res) {
  // console.log(req.body);
  // console.log(req.session.user);
  // if (req.session.user) {
  return Group
    .create({
      groupname: req.body.groupname,
    })
    .then((group) => {
      return res.json({
        confirmation: 'success',
        result: group
      });
    })
    .catch((error) => {
      // console.log(error);
      res.json({        
        message: error
      });
    })
    
};
exports.retrieve = function (req, res) {
  // req.session.username = req.body.username;
  return Group.findAll({})
    .then((group) => {
      return res.json({
        confirmation: 'success',
        results: group
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        confirmation: 'fail',
        message: error
      });
    });
};
// }
// else {
//   res.json({
//     message: "You need to login to create a group"
//   });
// }
=======
/**
 * 
 */
export default class GroupCtrl {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static createGroup(req, res) {
    console.log(req.body);
    Group
      .create({
        groupname: req.body.groupname,
      })
      .then((group) => {
        res.json({
          confirmation: 'success',
          result: group
        });
      })
      .catch((error) => {
      // console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
      })
      
  }
/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getGroup(req, res) {
    Group.findAll({})
      .then((group) => {
        res.json({
          confirmation: 'success',
          results: group
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
  }
}
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
>>>>>>> macsetup
