'use strict';

var User = require('../data/models').User;

exports.create = function (req, res) {
  // if(req.session.name) {
  // console.log(req.body);
  // console.log(req.params.groupId);
  return User.create({
    username: req.body.username,
    groupId: req.params.groupId
  }).then(function (user) {
    return res.json({
      message: 'User added successfully',
      result: user
    });
  }).catch(function (error) {
    console.log(error);
    res.json({ message: 'Cant add user to group' });
  });

  // }
  //  else {
  //    res.json({
  //      message: "You need to login to add user"
  //    });
  //  }
};