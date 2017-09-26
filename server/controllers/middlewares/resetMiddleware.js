import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * CreateGroupValidations class
 */
export default class ResetValidations {
/**
 * @description validates user input fields
 * @param {object} data
 * @returns {object} errors,isValid
 */
  static validateResetPassword(data) {
    const errors = {};
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!data.username) {
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
/**
 * @description validate User Input
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } =
      ResetValidations.validateResetPassword(req.body);
    if (!isValid) {
      res.status(422).json({
        errors
      });
    } else {
      next();
    }
  }
}
