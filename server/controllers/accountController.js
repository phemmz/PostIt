import bcrypt from 'bcrypt-nodejs';
import Models from '../data/models';

const User = Models.User;
// const Group = Models.Group;

/**
 * 
 */
export default class UserController {
  /**
   * 
   */
  constructor() {
    this.isOnline = false;
    this.userValid = true;
    this.userInGroup = false;

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
      .then(() => {
        this.userInGroup = true;
      });
  }
  /**
   * This class 
   * @param {object} req 
   * @param {object} res 
   */
  static signup(req, res) {
    req.session.status = false;
    if (req.session.status === true) {
      res.status(500).json({
        error: 'You already have an account'
      });
    } else {
      User
        .create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        })
        .then((account) => {
          req.session.username = req.body.username;
          res.status(201).json({
            confirmation: 'success',
            message: `${req.body.username} successfully added`,
            result: account
          });
        })
        .catch(() => res.status(400).json({
          confirmation: 'fail',
          message: 'Check input details'
        }));
    }
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static signin(req, res) {
    req.session.username = req.body.username;
    User.findAll({
      where: {
        username: req.body.username
      }
    })
      .then((account) => {
        let userdetails = JSON.stringify(account);
        userdetails = JSON.parse(userdetails);
        if (req.body.username && req.body.password &&
        bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
          req.session.user = req.body.username;
          req.session.userId = userdetails[0].id;
          res.json({
            confirmation: 'success',
            message: `${req.body.username} logged in`
          });
        } else {
          res.status(401).json({
            confirmation: 'fail',
            message: 'Check your login details'
          });
        }
      })
      .catch(() => {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Login failed!'
        });
      });
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static getAllUsers(req, res) {
    User.findAll({})
      .then((data) => {
        res.json({
          confirmation: 'success',
          result: data
        });
      })
      .catch((error) => {
        res.json({
          confirmation: 'fail',
          result: error
        });
      });
  }
}
