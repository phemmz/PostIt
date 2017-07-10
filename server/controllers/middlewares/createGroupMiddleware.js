import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class CreateGroupValidations {
/**
 * 
 * @param {object} data 
 */
  static validateCreateGroup(data) {
    const errors = {};
    if (data.groupname) {
      if (Validator.isEmpty(data.groupname.trim())) {
        errors.username = 'Please fill in your groupname';
      }
    }
    if (!data.groupname) {
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
    const { errors, isValid } = CreateGroupValidations.validateCreateGroup(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
