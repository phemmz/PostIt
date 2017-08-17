import isEmpty from 'lodash/isEmpty';

/**
 * SendMessageValidations class
 */
export default class SendMessageValidations {
/**
 * validateSendMessage validates user input fields
 * @param {object} data
 * @returns {object}
 */
  static validateSendMessage(data) {
    const errors = {};
    if (data.content === '' || data.content === null) {
      errors.content = 'Message content is required';
    }
    if (!data.content || !data.priority) {
      errors.invalid = 'Please fill the required parameters';
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
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = SendMessageValidations.validateSendMessage(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
