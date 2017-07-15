import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class AddUserValidations {
/**
 * 
 * @param {object} data 
 */
  static validateAddUser(data) {
    const errors = {};
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Username is required';
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
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = AddUserValidations.validateAddUser(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
