import Models from '../data/models';

const Group = Models.Group;
const User = Models.User;

/**
 * This class performs create and read functions for group
 */
export default class GroupController {
  /**
   * This method creates a new group based on some validations
   * @param {object} req
   * @param {object} res
   * @returns {object} json
   */
  static createGroup(req, res) {
    /**
     * Creates a new group
     */
    Group
      .create({
        groupname: req.body.groupname.toLowerCase(),
      })
      .then((group) => {
        /**
         * Query the User model for the current user
         */
        User.findOne({
          where: { username: req.session.username }
        })
          .then((user) => {
            /**
             * The user gets added to the group as the group creator
             */
            group.addUser(user)
              .then(() => {
                res.status(201).json({
                  confirmation: 'success',
                  message: `${req.body.groupname} successfully created`,
                  result: group
                });
              });
          });
      })
      /**
       * The catch block catches error if the groupname is not unique
       */
      .catch(() => {
        res.status(409).json({
          confirmation: 'fail',
          message: 'That group name already exist'
        });
      });
  }
  /**
   * This method adds a user to a particular group
   * @param {object} req
   * @param {object} res
   * @returns {object} json
   */
  static addUserToGroup(req, res) {
    /**
     * Finds the particular group by its id
     */
    Group.findOne({ where: { id: req.params.groupId } })
      .then((group) => {
        /**
         * Checks if the group exist or not
         */
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist',
          });
        } else {
          /**
           * If the group exists, check if the user is a registered user
           */
          User.findOne({
            where: { username: req.body.username }
          })
            .then((user) => {
              /**
               * Returns json object with status 404,
               * if the user is not a registered user
               */
              if (user === null) {
                res.status(404).json({
                  confirmation: 'fail',
                  message: 'User does not exist',
                });
              } else {
                /**
                 * If the user exist,
                 */
                group.addUser(user)
                  .then((added) => {
                    /**
                     * Checks if the user is already added to the group
                     */
                    if (added.length === 0) {
                      res.status(400).json({
                        confirmation: 'fail',
                        message: 'User already exists'
                      });
                    } else {
                      /**
                       * If not return a json object with status 201
                       */
                      res.status(201).json({
                        confirmation: 'success',
                        message: 'User added successfully'
                      });
                    }
                  })
                  .catch(() => {
                    res.status(400).json({
                      confirmation: 'fail',
                      message: 'Failed to add user'
                    });
                  });
              }
            });
        }
      })
      .catch(() => {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Invalid'
        });
      });
  }
/**
 * Gets all the group(s) a user belongs to
 * @param {object} req
 * @param {object} res
 */
  static getGroup(req, res) {
    User.findOne({
      where: { username: req.session.username }
    })
      .then((user) => {
        user.getGroups({
          where: {}
        })
          .then((groups) => {
            if (groups.length < 1) {
              res.status(404).json({
                confirmation: 'fail',
                message: 'You currently dont belong to any group'
              });
            } else {
              res.status(200).json({
                confirmation: 'success',
                results: groups
              });
            }
          })
          .catch((error) => {
            res.status(404).json({
              confirmation: 'fail',
              message: error
            });
          });
      })
      .catch((error) => {
        res.status(404).json({
          confirmation: 'fail',
          message: error
        });
      });
  }
}
