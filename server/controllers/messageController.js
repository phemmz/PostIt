const Message = require('../data/models').Message;

<<<<<<< HEAD
exports.create = function (req, res) {
  // console.log(req.body);
  // console.log(req.params.groupId);
  // if(req.session.name) {
  return Message
    .create({
      content: req.body.content,
      readcheck: req.body.readcheck,
      priority: req.body.priority,
      groupId: req.params.groupId,
    })
    .then((message) => {
      return res.json({
        confirmation: 'success',
        result: message
      });
    })
    .catch((error) => {      
     res.json({
        confirmation: 'fail',
        message: error
      });
    })
    
=======

export default class MessageCtrl {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static sendMessage(req, res) {
    Message
      .create({
        content: req.body.content,
        readcheck: req.body.readcheck,
        priority: req.body.priority,
        groupId: req.params.groupId,
      })
      .then((message) => {
        res.json({
          confirmation: 'success',
          result: message
        });
      })
      .catch((error) => {
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
  static getMessages(req, res) {
    return Message.findAll({
      where: { groupId: req.params.groupId }
    })
      .then((messages) => {
        let msg = JSON.stringify(messages);
        msg = JSON.parse(msg);
        res.json(msg);
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
  // console.log(req.params.groupId);
  // if(req.session.name) {
  // return Message
  //   .create({
  //     content: req.body.content,
  //     readcheck: req.body.readcheck,
  //     priority: req.body.priority,
  //     groupId: req.params.groupId,
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.json({
  //       confirmation: 'fail',
  //       message: error
  //     });
  //   })
  //   .then((message) => {
  //     res.json({
  //       confirmation: 'success',
  //       result: message
  //     });
  //   });
>>>>>>> macsetup

  // }
  // else {
  //  res.json({
  //   message: "Login to send message"
  //  });
  // }
// };

exports.retrieve = function (req, res) {
  // if(req.session.name) {
  return Message.findAll({
    where: { groupId: req.params.groupId }
  })
    .then((messages) => {
      let msg = JSON.stringify(messages);
      msg = JSON.parse(msg);
      return res.json(msg);
    })
    .catch((error) => {
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
