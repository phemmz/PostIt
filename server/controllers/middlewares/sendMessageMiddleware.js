import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class SendMessageValidations {
/**
 * 
 * @param {object} data 
 */
  static validateSendMessage(data) {
    const errors = {};
    if (data.content === '' || data.content === null) {
      errors.username = 'Message content is required';
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
 * 
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
