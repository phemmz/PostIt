import Usr from '../data/models';

const User = Usr.Users;
const Account = Usr.Account;
const Group = Usr.Group;
/**
 * This class CRUD functions for adding users to a group
 */
export default class UserCtrl {
  /**
   * 
   */
  constructor() {
    this.error = '';
    this.userInGroup = false;
    this.userValid = false;
  }
  /**
   * 
   * @param {*} username 
   * @param {*} groupId 
   */
  static checkUserInGroup(uname, gId) {
    User.findOne({
      where: {
        username: uname,
        groupId: gId
      }
    })
      .then((user) => {
        this.userInGroup = true;
        JSON.stringify(user);
      });
  }
  /**
   * 
   * @param {*} uname 
   */
  static checkRegisteredUser(uname) {
    Account.findOne({
      where: {
        username: uname
      }
    })
      .then(() => {
        UserCtrl.userValid = true;
      });
  }
  /**
   * This method add a user to a particular group
   * @param {object} req 
   * @param {object} res 
   */
  static addUser(req, res) {
    if (req.session.username) {
      // UserCtrl.checkUserInGroup(req.body.username, req.params.groupId);
      // UserCtrl.checkRegisteredUser(req.body.username);
      // if (UserCtrl.userValid === false) {
      // res.status(400).json({
      //   confirmation: 'fail',
      //   message: 'User does not exist'
      // });
      // this.userValid = true;
    // } else if (UserCtrl.userInGroup === true) {
      // this.userInGroup = false;
      // res.json({
      //   confirmation: 'fail',
      //   message: 'User has already been added to the group'
      // });
      // } else {
      console.log(req.params.groupId);
      Group.findOne({ where: { id: req.params.groupId } })
        .then((group) => {
          Account.findOne({
            where: { username: req.body.username }
          })
            .then((user) => {
              console.log(user);
              group.addUser(user)
                .then((added) => {
                  res.status(201).json({
                    message: 'User added successfully',
                    result: added
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(404).send(error);
                });
            })
            .catch((err) => {
              res.json({
                message: 'User does not exist',
                error: err
              });
            });
        })
        .catch((err) => {
          res.json({
            message: 'Group does not exist',
            error: err
          });
        });
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please log in to add a user to a group'
      });
    }
  }

  /**
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getGroup(req, res) {
    const user = req.session.username;
    if (req.session.username) {
      User.findAll({
        where: {
          username: user
        }
      })
        .then((group) => {
          console.log(group);
          res.json({
            confirmation: 'success',
            results: group
          });
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
        message: 'Please log in'
      });
    }
  }
}
