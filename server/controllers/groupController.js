import Models from '../data/models';

const Group = Models.Group;
const User = Models.User;

/**
 * 
 */
export default class GroupController {
  /**
   * 
   */
  constructor() {
    this.userInGroup = false;
    this.errormsg = {};
  }
  /**
   * Checks if a user belongs to a group
   * @param {*} req 
   * @param {*} res 
   */
  static checkUserInGroup(uname, gId) {
    Group.findOne({
      where: { id: gId }
    })
      .then((group) => {
        if (group.length > 0) {
          group.getUsers({
            where: { username: uname }
          })
            .then((user) => {
              if (user.length > 1) {
                this.userInGroup = true;
              } else {
                this.userInGroup = false;
              }
            })
            .catch((err) => {
              this.errormsg = err;
            });
        } else {
          this.errormsg = 'group does not exist';
        }
      });
    return (this.userInGroup, this.errormsg);
  }
  /**
   * 
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
                  res.status(200).json({
                    confirmation: 'success',
                    message: `${req.body.groupname} successfully created`,
                    result: group
                  });
                })
                .catch((error) => {
                  res.status(400).json({
                    confirmation: 'fail',
                    message: error
                  });
                });
            })
            .catch((error) => {
              res.status(400).json({
                confirmation: 'fail',
                message: error
              });
            });
        })
        .catch((error) => {
          res.json({
            confirmation: 'fail',
            message: error.errors
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
   * This method add a user to a particular group
   * @param {object} req 
   * @param {object} res 
   */
  static addUserToGroup(req, res) {
    if (req.session.username) {
      // GroupController.checkUserInGroup(req.session.username, req.params.groupId);
      // if (GroupController.userInGroup) {
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
                          message: 'User added successfully',
                          result: added
                        });
                      }
                    })
                    .catch((error) => {
                      res.status(404).send(error);
                    });
                }
              })
              .catch((err) => {
                res.json({
                  confirmation: 'fail',
                  error: err
                });
              });
          }
        })
        .catch((err) => {
          res.json({
            confirmation: 'fail',
            error: err
          });
        });
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please sign in to create a group'
      });
    }
    // } else {
    //   req.status(400).json({
    //     confirmation: 'fail',
    //     message: 'User does not belong to this group'
    //   });
    // }
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
              res.status(200).json({
                confirmation: 'success',
                results: groups
              });
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
