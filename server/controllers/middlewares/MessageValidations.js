import isEmpty from 'lodash/isEmpty';

/**
 * @class MessageValidations
 */
export default class MessageValidations {
  /**
   * @description validateSendMessage validates user input fields
   * @param {object} messageDetails
   * @returns {object} errors, isValid
   */
  static validateSendMessage(messageDetails) {
    const errors = {};
    if (messageDetails.content === '' || messageDetails.content === null) {
      errors.content = 'Message content is required';
    }
    if (!messageDetails.content || !messageDetails.priority) {
      errors.invalid = 'Please fill the required parameters';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
