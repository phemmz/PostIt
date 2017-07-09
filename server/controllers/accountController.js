import bcrypt from 'bcrypt-nodejs';
//import Acc from '../data/models';
import Validations from './middlewares/middleware';

const Account = require('../data/models').Account;
// const Account = Acc.Account;
const validate = new Validations();

/**
 * 
 */
export default class AccountCtrl {
  /**
   * 
   */
  constructor() {
    this.isOnline = false;
    this.userValid = true;
  }
  /**
   * This class 
   * @param {object} req 
   * @param {object} res 
   */
  static signup(req, res) {
    const { errors, isValid } = validate.validateInput(req.body);
    req.session.status = false;
    req.session.username = req.body.username;
    if (!isValid) {
      return res.status(400).json(errors);
    } else if (req.session.status === true) {
      res.status(500).json({
        error: 'You already have an account'
      });
    } else {
      Account
        .create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        })
        .then(account => res.status(201).json({
          confirmation: 'success',
          message: `${req.body.username} successfully added`,
          result: account
        }))
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
    Account.findAll({
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
      .catch((error) => {
        res.json({
          confirmation: 'fail',
          message: error
        });
      });
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static getAll(req, res) {
    Account.findAll({})
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
