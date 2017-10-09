import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * sharedSigninValidations class
 */
export default class sharedSigninValidations {
/**
 * validateSignin() takes in the data from the body for login and validates them
 * @param {object} userDetails
 * @returns {object} errors,isValid
 */
  static validateSignin(userDetails) {
    const errors = {};
    if (!userDetails.username) {
      errors.username = 'Please fill in your username';
    }
    if (userDetails.username) {
      if (Validator.isEmpty(userDetails.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!userDetails.password) {
      errors.password = 'Please fill in your password';
    }
    if (userDetails.password) {
      if (Validator.isEmpty(userDetails.password.trim())) {
        errors.password = 'Please fill in your password';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
