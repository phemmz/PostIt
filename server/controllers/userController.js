const User = require('../data/models').Users;
/**
 * This class CRUD functions for adding users to a group
 */
export default class UserCtrl {
  /**
   * This method add a user to a particular group
   * @param {object} req 
   * @param {object} res 
   */
  static addUser(req, res) {
    // console.log("this one na test",req.body);
    User.create({
      username: req.body.username,
      groupId: req.params.groupId
    })
      .then((user) => {
        res.json({
          message: 'User added successfully',
          result: user
        });
      })
      .catch((err) => {
        // console.log(err);
        res.json({
          message: 'Cant add user to group',
          error: err
        });
      });
  }
}
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
