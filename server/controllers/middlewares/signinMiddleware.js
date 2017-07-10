import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class SigninValidations {
/**
 * 
 * @param {object} data 
 */
  static validateSignin(data) {
    const errors = {};
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (data.password) {
      if (Validator.isEmpty(data.password.trim())) {
        errors.password = 'Please fill in your password';
      }
    }
    if (!data.username || !data.password) {
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = SigninValidations.validateSignin(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
