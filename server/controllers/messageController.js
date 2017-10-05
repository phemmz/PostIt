import Model from '../data/models';
import sendMail from './helpers/sendMail';
import sendSMS from './helpers/sendSMS';
import MessageValidations from './middlewares/MessageValidations';

const Message = Model.Message;
const User = Model.User;
const Group = Model.Group;
const View = Model.View;

/**
 * @description MessageController class
 */
export default class MessageController {
  /**
   * @description It sends message to a particular group
   * @param {object} request
   * @param {object} response
   * @return {object} json
   */
  static sendMessage(request, response) {
    const { errors, isValid } =
      MessageValidations.validateSendMessage(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      /**
       * @description Find the particular group by its id
       */
      Group.findOne({
        where: { id: request.params.groupId }
      })
      .then((group) => {
        /**
         * @description Checks if the group exist
         */
        if (group === null) {
          response.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          /**
           * If the group exist,
           * Find the User
           */
          User.findOne({
            where: { username: request.currentUser.username }
          })
            .then((user) => {
              group.getUsers({
                where: {}
              })
                .then((members) => {
                  Message
                    .create({
                      content: request.body.content,
                      readcheck: request.body.readcheck,
                      priority: request.body.priority,
                      groupId: request.params.groupId,
                      messagecreator: user.username,
                      userId: user.id
                    })
                      .then((message) => {
                        request.app.io.emit(
                          'newMsg', `New message from
                           ${message.messagecreator} in ${group.groupname}
                            group`);
                        members.map((member) => {
                          if (message.priority === 'Urgent') {
                            if (member.username !== message.messagecreator) {
                              sendMail(member.email, message.priority,
                                message.messagecreator, group.groupname,
                                member.username, request, response);
                            }
                          } else if (message.priority === 'Critical') {
                            if (member.username !== message.messagecreator) {
                              sendMail(member.email, message.priority,
                                message.messagecreator, group.groupname,
                                member.username, request, response);
                              sendSMS(member.phoneNumber,
                                message.messagecreator, message.priority,
                                group.groupname);
                            }
                          }
                          return member;
                        });
                        response.status(201).json({
                          confirmation: 'success',
                          message: 'Message sent',
                          results: message,
                          groupMembers: members
                        });
                      })
                      .catch((err) => {
                        response.status(400).json({
                          confirmation: 'fail',
                          message: err
                        });
                      });
                });
            });
        }
      });
    }
  }
/**
 * @description it gets all messages in a group
 * @param {object} request
 * @param {object} response
 * @return {object} json
 */
  static getMessages(request, response) {
    Message.findAll({
      where: { groupId: request.params.groupId }
    })
      .then((messages) => {
        if (messages.length < 1) {
          response.status(404).json({
            confirmation: 'fail',
            message: 'No message found'
          });
        } else {
          response.status(200).json({
            confirmation: 'success',
            results: messages
          });
        }
      })
      .catch((error) => {
        response.json({
          confirmation: 'fail',
          message: error
        });
      });
  }
  /**
   * @description updates the readStatus after viewing a message
   * @param {*} request
   * @param {*} response
   * @return {*} void
   */
  static readStatus(request, response) {
    View.findOne({
      where: {
        groupId: request.params.groupId,
        username: request.currentUser.username
      }
    })
      .then((result) => {
        if (result === null) {
          View.create({
            groupId: request.params.groupId,
            username: request.currentUser.username
          })
            .then((view) => {
              response.status(201).json({
                confirmation: 'success',
                results: view
              });
            })
            .catch((err) => {
              response.json({
                confirmation: 'fail',
                message: err
              });
            });
        } else {
          response.json({
            confirmation: 'success'
          });
        }
      });
  }
  /**
   * @description It gets all the people who have read a message
   * @param {*} request
   * @param {*} response
   * @return {*} void
   */
  static readList(request, response) {
    View.findAll({
      where: { groupId: request.params.groupId }
    })
      .then((results) => {
        const list = [];
        results.map((eachUser) => {
          return list.push(eachUser.username);
        });
        const uniqueList = list.filter((item, pos, self) => {
          return self.indexOf(item) === pos;
        });
        response.status(200).json({
          confirmation: 'success',
          uniqueList
        });
      })
      .catch(() => {
        response.status(400).json({
          confirmation: 'fail',
          message: 'Invalid group id'
        });
      });
  }
}
