import util from 'util';
import Models from '../data/models';
import GroupValidations from './middlewares/GroupValidations';

const Group = Models.Group;
const User = Models.User;

/**
 * @description This class performs create and read functions for group
 */
export default class GroupController {
  /**
   * @description This method creates a new group based on some validations
   * @param {object} request
   * @param {object} response
   * @returns {object} json
   */
  static createGroup(request, response) {
    const { errors, isValid } =
    GroupValidations.validateCreateGroup(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      /**
       * @description Creates a new group
       */
      Group
        .create({
          groupname: request.body.groupname.toLowerCase(),
        })
        .then((group) => {
          /**
           * @description Query the User model for the current user
           */
          User.findOne({
            where: { username: request.currentUser.username }
          })
          .then((user) => {
            /**
             * @description The user gets added to the group as
             * the group creator
             */
            group.addUser(user)
              .then(() => {
                response.status(201).json({
                  confirmation: 'success',
                  message: `${request.body.groupname} successfully created`,
                  result: group
                });
              });
          });
        })
        /**
         * @description The catch block catches error if the
         * groupname is not unique
         */
        .catch(() => {
          response.status(409).json({
            confirmation: 'fail',
            message: 'That group name already exist'
          });
        });
    }
  }
  /**
   * @description This method adds a user to a particular group
   * @param {object} request
   * @param {object} response
   * @returns {object} json
   */
  static addUserToGroup(request, response) {
    const { errors, isValid } =
      GroupValidations.validateAddUser(request.body);
    if (!isValid) {
      response.status(422).json({
        errors
      });
    } else {
      /**
       * @description Finds the particular group by its id
       */
      Group.findOne({ where: { id: request.params.groupId } })
        .then((group) => {
          /**
           * @description Checks if the group exist or not
           */
          if (group === null) {
            response.status(404).json({
              confirmation: 'fail',
              message: 'Group does not exist',
            });
          } else {
            /**
             * @description If the group exists, check if the user
             * is a registered user
             */
            User.findOne({
              where: { username: request.body.username }
            })
            .then((user) => {
              /**
               * @description Returns json object with status 404,
               * if the user is not a registered user
               */
              if (user === null) {
                response.status(404).json({
                  confirmation: 'fail',
                  message: 'User does not exist',
                });
              } else {
                /**
                 * @description If the user exist,
                 */
                group.addUser(user)
                  .then((added) => {
                    /**
                     * @description Checks if the user is already
                     * added to the group
                     */
                    if (added.length === 0) {
                      response.status(400).json({
                        confirmation: 'fail',
                        message: 'User already exists'
                      });
                    } else {
                      /**
                       * @description If not return a json object with
                       * status 201
                       */
                      response.status(201).json({
                        confirmation: 'success',
                        message: 'User added successfully'
                      });
                    }
                  })
                  .catch(() => {
                    response.status(400).json({
                      confirmation: 'fail',
                      message: 'Failed to add user'
                    });
                  });
              }
            });
          }
        })
        .catch(() => {
          response.status(400).json({
            confirmation: 'fail',
            message: 'Invalid'
          });
        });
    }
  }
/**
 * @description Gets all the group(s) a user belongs to
 * @param {object} request
 * @param {object} response
 * @return {*} json
 */
  static getGroup(request, response) {
    User.findOne({
      where: { username: request.currentUser.username }
    })
      .then((user) => {
        user.getGroups({
          where: {}
        })
          .then((data) => {
            if (data.length < 1) {
              response.status(404).json({
                confirmation: 'fail',
                message: 'You currently dont belong to any group'
              });
            } else {
              const groups = [];
              data.map((group) => {
                return groups.push({
                  id: group.id,
                  groupname: group.groupname
                });
              });
              response.status(200).json({
                confirmation: 'success',
                results: groups
              });
            }
          })
          .catch((error) => {
            response.status(404).json({
              confirmation: 'fail',
              message: error
            });
          });
      })
      .catch((error) => {
        response.status(404).json({
          confirmation: 'fail',
          message: error
        });
      });
  }
  /**
   * @description gets all the members of a group
   * @param {*} request
   * @param {*} response
   * @return {*} json
   */
  static groupMembers(request, response) {
    Group.findOne({
      where: {
        id: request.params.groupId
      }
    })
      .then((group) => {
        group.getUsers({
          where: {}
        })
          .then((users) => {
            const members = [];
            users.map((member) => {
              return members.push({
                id: member.id,
                username: member.username,
                email: member.email,
                phoneNumber: member.phoneNumber
              });
            });
            const PER_PAGE = 5;
            const offset =
            request.params.offset ? parseInt(request.params.offset, 10) : 0;
            const nextOffset = (offset + PER_PAGE);
            const previousOffset =
              (offset - PER_PAGE < 1) ? 0 : (offset - PER_PAGE);
            const metaData = {
              limit: PER_PAGE,
              next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
              offset: request.params.offset,
              previous: util.format(
                '?limit=%s&offset=%s', PER_PAGE, previousOffset),
              total_count: members.length
            };
            const getPaginatedItems =
              members.slice(offset, (offset + PER_PAGE));
            response.status(200).json({
              confirmation: 'success',
              members,
              metaData,
              paginatedMembers: getPaginatedItems
            });
          })
          .catch((err) => {
            response.status(400).json({
              confirmation: 'fail',
              message: err.name
            });
          });
      })
      .catch(() => {
        response.status(400).json({
          confirmation: 'fail',
          message: 'Failed to get group members'
        });
      });
  }
}
