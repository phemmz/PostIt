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
   */
  static createGroup(req, res) {
    if (req.session.username) {
      Group
        .create({
          groupname: req.body.groupname,
        })
        .then((group) => {
          User.findOne({
            where: { username: req.session.username }
          })
            .then((user) => {
              group.addUser(user)
                .then(() => {
                  res.status(201).json({
                    confirmation: 'success',
                    message: `${req.body.groupname} successfully created`
                  });
                });
            });
        })
        .catch(() => {
          res.status(409).json({
            confirmation: 'fail',
            message: 'That group name already exist'
          });
        });
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please sign in to create a group'
      });
    }
  }
  /**
   * This method adds a user to a particular group
   * @param {object} req 
   * @param {object} res 
   */
  static addUserToGroup(req, res) {
    Group.findOne({ where: { id: req.params.groupId } })
      .then((group) => {
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist',
          });
        } else {
          User.findOne({
            where: { username: req.body.username }
          })
            .then((user) => {
              if (user === null) {
                res.status(404).json({
                  confirmation: 'fail',
                  message: 'User does not exist',
                });
              } else {
                group.addUser(user)
                  .then((added) => {
                    if (added.length === 0) {
                      res.status(400).json({
                        confirmation: 'fail',
                        message: 'User already exists'
                      });
                    } else {
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
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getGroup(req, res) {
    if (req.session.username) {
      User.findOne({
        where: { username: req.session.username }
      })
        .then((user) => {
          user.getGroups({
            where: {}
          })
            .then((groups) => {
              if (groups.length < 1) {
                res.status(200).json({
                  confirmation: 'success',
                  results: 'You currently dont belong to any group'
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
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please log in'
      });
    }
  }
}
