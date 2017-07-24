import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 *
 */
export default class sharedSigninValidations {
/**
 *
 * @param {object} data
 */
  static validateSignin(data) {
    const errors = {};
    if (!data.username) {
      errors.username = 'Please fill in your username';
    }
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!data.password) {
      errors.password = 'Please fill in your password';
    }
    if (data.password) {
      if (Validator.isEmpty(data.password.trim())) {
        errors.password = 'Please fill in your password';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
