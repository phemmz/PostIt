import Model from '../data/models';

const Message = Model.Message;
const User = Model.User;
const Group = Model.Group;

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
    Group.findOne({
      where: { id: req.params.groupId }
    })
      .then((group) => {
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
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
                      message: 'Message sent',
                      results: message
                    });
                  })
                  .catch(() => {
                    res.status(400).json({
                      confirmation: 'fail',
                      message: 'Message failed'
                    });
                  });
            });
        }
      });
  }
/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getMessages(req, res) {
    if (req.session.username) {
      Message.findAll({
        where: { groupId: req.params.groupId }
      })
        .then((messages) => {
          if (messages.length < 1) {
            res.status(404).json({
              confirmation: 'fail',
              message: 'No message found'
            });
          } else {
            res.status(200).json({
              confirmation: 'success',
              results: messages
            });
          }
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
