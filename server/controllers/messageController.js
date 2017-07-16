import Model from '../data/models';

const Message = Model.Message;
const User = Model.User;

/**
 * 
 */
export default class MessageController {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static sendMessage(req, res) {
    if (req.session.username) {
      User.findOne({
        where: { username: req.session.username }
      })
        .then((user) => {
          Message
            .create({
              content: req.body.content,
              readcheck: req.body.readcheck,
              priority: req.body.priority,
              groupId: req.params.groupId,
              userId: user.id
            })
            .then((message) => {
              res.status(201).json({
                confirmation: 'success',
                result: message
              });
            })
            .catch((error) => {
              res.status(400).json({
                confirmation: 'fail',
                message: error
              });
            });
        });
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please log in to send a message'
      });
    }
  }
/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getMessages(req, res) {
    if (req.session.username) {
      return Message.findAll({
        where: { groupId: req.params.groupId }
      })
        .then((messages) => {
          let msg = JSON.stringify(messages);
          msg = JSON.parse(msg);
          res.json(msg);
        })
        .catch((error) => {
          res.json({
            confirmation: 'fail',
            message: error
          });
        });
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'You are not logged in'
      });
    }
  }
}
