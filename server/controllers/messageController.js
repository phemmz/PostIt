import util from 'util';
import Model from '../data/models';
import sendMail from './helpers/sendMail';
import sendSMS from './helpers/sendSMS';

const Message = Model.Message;
const User = Model.User;
const Group = Model.Group;
const View = Model.View;

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
              group.getUsers({
                where: {}
              })
                .then((members) => {
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
                        members.map((member) => {
                          if (message.priority === 'Urgent') {
                            if (member.username !== message.messagecreator) {
                              sendMail(member.email, message.priority,
                                message.messagecreator, group.groupname, member.username, req, res);
                            }
                          } else if (message.priority === 'Critical') {
                            if (member.username !== message.messagecreator) {
                              sendMail(member.email, message.priority, message.messagecreator,
                                 group.groupname, member.username, req, res);
                              sendSMS(member.phoneNumber, message.messagecreator,
                                 message.priority, group.groupname);
                            }
                          }
                          return member;
                        });
                        res.status(201).json({
                          confirmation: 'success',
                          message: 'Message sent',
                          results: message,
                          groupMembers: members
                        });
                      })
                      .catch((err) => {
                        res.status(400).json({
                          confirmation: 'fail',
                          message: err
                        });
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
  /**
   * readStatus
   * @param {*} req
   * @param {*} res
   * @return {*} void
   */
  static readStatus(req, res) {
    View.findOne({
      where: {
        groupId: req.params.groupId,
        username: req.currentUser.username
      }
    })
      .then((response) => {
        if (response === null) {
          View.create({
            groupId: req.params.groupId,
            username: req.currentUser.username
          })
            .then((view) => {
              res.status(201).json({
                confirmation: 'success',
                results: view
              });
            })
            .catch((err) => {
              res.json({
                confirmation: 'fail',
                message: err
              });
            });
        } else {
          res.json({
            confirmation: 'success'
          });
        }
      });
  }
  /**
   * readList
   * @param {*} req
   * @param {*} res
   * @return {*} void
   */
  static readList(req, res) {
    View.findAll({
      where: { groupId: req.params.groupId }
    })
      .then((response) => {
        const list = [];
        response.map((eachUser) => {
          return list.push(eachUser.username);
        });
        const uniqueList = list.filter((item, pos, self) => {
          return self.indexOf(item) === pos;
        });
        res.status(200).json({
          confirmation: 'success',
          uniqueList
        });
      })
      .catch(() => {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Invalid group id'
        });
      });
  }
  /**
   * searchUsers
   * @param {*} req
   * @param {*} res
   * @returns {*} json
   */
  static searchUsers(req, res) {
    User.findAll({
      where: {
        username: {
          $iLike: `%${req.params.searchKey}%`
        }
      }
    })
      .then((response) => {
        const userDetails = [];
        response.map((user) => {
          return userDetails.push({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
          });
        });
        const PER_PAGE = 5;
        const offset = req.params.offset ? parseInt(req.params.offset, 10) : 0;
        const nextOffset = (offset + PER_PAGE);
        const previousOffset = (offset - PER_PAGE < 1) ? 0 : (offset - PER_PAGE);
        const meta = {
          limit: PER_PAGE,
          next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
          offset: req.params.offset,
          previous: util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
          total_count: userDetails.length
        };
        const getPaginatedItems = userDetails.slice(offset, (offset + PER_PAGE));
        res.status(200).json({
          confirmation: 'success',
          users: userDetails,
          meta,
          comments: getPaginatedItems
        });
      })
      .catch((error) => {
        res.status(404).json({
          confirmation: 'fail',
          error
        });
      });
  }
}
