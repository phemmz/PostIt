import bcrypt from 'bcrypt-nodejs';
import Models from '../data/models';

const User = Models.User;

/**
 * This class is in charge of signup and signin
 */
export default class UserController {
  /**
   * This method creates a new account for a new user
   * @param {object} req
   * @param {object} res
   */
  static signup(req, res) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(() => {
        req.session.username = req.body.username;
        res.status(201).json({
          confirmation: 'success',
          message: `${req.body.username} successfully created`
        });
      })
      .catch(() => res.status(400).json({
        confirmation: 'fail',
        message: 'Check input details'
      }));
    }

  /**
   * This method logs in a user
   * @param {*} req
   * @param {*} res
   */
  static signin(req, res) {
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
          req.session.username = req.body.username;
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
      .catch((err) => {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Login failed'
        });
      });
  }
  /**
   * This method gets all the registered users in the application
   * @param {object} req 
   * @param {object} res 
   */
  static getAllUsers(req, res) {
    if (req.session.username) {
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
    } else {
      res.status(401).json({
        confirmation: 'fail',
        message: 'You are not logged in'
      });
    }
  }
}
