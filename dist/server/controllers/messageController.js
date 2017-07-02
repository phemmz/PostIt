'use strict';

var Message = require('../data/models').Message;

exports.create = function (req, res) {
  // console.log(req.body);
  // console.log(req.params.groupId);
  // if(req.session.name) {
  return Message.create({
    content: req.body.content,
    readcheck: req.body.readcheck,
    priority: req.body.priority,
    groupId: req.params.groupId
  }).then(function (message) {
    return res.json({
      confirmation: 'success',
      result: message
    });
  }).catch(function (error) {
    res.json({
      confirmation: 'fail',
      message: error
    });
  });

  // }
  // else {
  //  res.json({
  //   message: "Login to send message"
  //  });
  // }
};

exports.retrieve = function (req, res) {
  // if(req.session.name) {
  return Message.findAll({
    where: { groupId: req.params.groupId }
  }).then(function (messages) {
    var msg = JSON.stringify(messages);
    msg = JSON.parse(msg);
    return res.json(msg);
  }).catch(function (error) {
    console.log(error);
    return res.json({
      confirmation: 'fail',
      message: error
    });
  });

  // }
  // else {
  //  res.json({
  //    message: "Login to get messages"
  //  });
  // }
};