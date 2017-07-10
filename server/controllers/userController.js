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
    this.username = uname;
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
  static checkUserValidity(uname) {
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
      UserCtrl.checkUserInGroup(req.body.uname);
      UserCtrl.checkUserValidity(req.body.uname);
      if (UserCtrl.userValid === false) {
        res.status(400).json({
          confirmation: 'fail',
          message: 'User does not exist'
        });
      } else if (UserCtrl.userInGroup === true) {
        res.json({
          confirmation: 'fail',
          message: 'User has already been added to the group'
        });
      } else {
        User.create({
          username: req.body.username,
          groupname: req.body.groupname,
          groupId: req.params.groupId
        })
          .then((user) => {
            res.json({
              message: 'User added successfully',
              result: user
            });
          })
          .catch((err) => {
            res.json({
              message: 'Cant add user to group',
              error: err
            });
          });
      }
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
