import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import sharedSignupValidations from '../../shared/signupvalidations';
import Model from '../../data/models';

const User = Model.User;

/**
 *
 */
export default class SignupValidations {
  /**
   *
   * @param {*} data
   * @param {*} otherValidations
   */
  static validateInput(data, otherValidations) {
    const { errors } = otherValidations(data);
    return Promise.all([
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
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
