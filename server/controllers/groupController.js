const Group = require('../data/models').Group;

exports.create = function (req, res) {
  // console.log(req.body);
  // console.log(req.session.user);
  // if (req.session.user) {
  return Group
    .create({
      groupname: req.body.groupname,
    })
    .catch((error) => {
      // console.log(error);
      res.json({        
        message: error
      });
    })
    .then((group) => {
      return res.json({
        confirmation: 'success',
        result: group
      });
    });
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
