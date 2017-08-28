import Model from '../data/models';

const Message = Model.Message;
const User = Model.User;
const Group = Model.Group;

/**
 * MessageController class
 */
export default class MessageController {
  /**
   * sendMessage() sends message to a particular group
   * @param {object} req
   * @param {object} res
   * @return {object} json
   */
  static sendMessage(req, res) {
    /**
     * Find the particular group by its id
     */
    Group.findOne({
      where: { id: req.params.groupId }
    })
      .then((group) => {
        /**
         * Checks if the group exist
         */
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          /**
           * If the group exist,
           * Find the User
           */
          User.findOne({
            where: { username: req.currentUser.username }
          })
            .then((user) => {
              Message
                .create({
                  content: req.body.content,
                  readcheck: req.body.readcheck,
                  priority: req.body.priority,
                  groupId: req.params.groupId,
                  messagecreator: user.username,
                  userId: user.id
                })
                  .then((message) => {
                    req.app.io.emit('newMsg', `New message from ${message.messagecreator} in ${group.groupname} group`);
                    res.status(201).json({
                      confirmation: 'success',
                      message: 'Message sent',
                      results: message
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      confirmation: 'fail',
                      message: err
                    });
                  });
            });
        }
      });
  }
/**
 * Get all messages in a group
 * @param {object} req
 * @param {object} res
 * @return {object} json
 */
  static getMessages(req, res) {
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
  }
}
