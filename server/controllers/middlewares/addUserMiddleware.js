import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * AddUserValidations class
 */
export default class AddUserValidations {
/**
 * validateAddUser()
 * @param {object} data
 * @returns {object} errors,isValid
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
 * validateUserInput
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
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
