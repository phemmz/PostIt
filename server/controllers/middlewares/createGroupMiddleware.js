import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * CreateGroupValidations class
 */
export default class CreateGroupValidations {
/**
 * @param {object} data
 * @returns {object} errors,isValid
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
 * validateUserInput()
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = CreateGroupValidations.validateCreateGroup(req.body);
    if (!req.session.username) {
      res.status(401).json({
        confirmation: 'fail',
        message: 'Please log in'
      });
    } else if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
