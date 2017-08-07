import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import sharedSignupValidations from '../../shared/signupvalidations';
import Model from '../../data/models';

const User = Model.User;

/**
 * SignupValidations class
 */
export default class SignupValidations {
  /**
   * validateInput() validates user inputs for signup
   * and also checks if the username and email already exist on the database
   * @param {*} data
   * @param {*} otherValidations
   * @returns {object} json
   */
  static validateInput(data, otherValidations) {
    /**
     * Deconstruct all errors from otherValidations
     */
    const { errors } = otherValidations(data);
    /**
     * Promise.all returns a single promise for the 2 database calls
     */
    return Promise.all([
      /**
       * Checks if the username already exists
       */
      User.findOne({
        where: {
          username: data.username
        }
      })
      .then((user) => {
        if (user) {
          errors.username = 'There is user with such username';
        }
      }),
      /**
       * Checks if the email already exists
       */
      User.findOne({
        where: {
          email: data.email
        }
      })
      .then((user) => {
        if (user) {
          errors.email = 'There is user with such email';
        }
      })
    ]).then(() => {
      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
  }
/**
 * validateUserInput()
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    SignupValidations.validateInput(req.body, sharedSignupValidations.commonValidations)
    .then(({ errors, isValid }) => {
      if (!isValid) {
        res.status(422).json(errors);
      } else {
        next();
      }
    });
  }
}
