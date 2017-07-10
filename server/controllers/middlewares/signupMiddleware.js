import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class SignupValidations {
/**
 * 
 * @param {object} data 
 */
  static validateSignup(data) {
    const errors = {};
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (data.email && !Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (data.password) {
      if (Validator.isEmpty(data.password.trim())) {
        errors.password = 'Please fill in your password';
      }
    }
    if (data.passwordConfirmation) {
      if (Validator.isEmpty(data.passwordConfirmation.trim())) {
        errors.password = 'This field is required';
      }
    }
    if (data.password && data.password.length <= 5) {
      errors.password = 'Password length must not be less than 6 characters';
    }
    if (data.password && data.passwordConfirmation) {
      if (data.password.trim() !== data.passwordConfirmation.trim()) {
        errors.passwordConfirmation = 'Passwords must match!!';
      }
    }
    if (!data.username || !data.email || !data.password || !data.passwordConfirmation) {
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
    const { errors, isValid } = SignupValidations.validateSignup(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
