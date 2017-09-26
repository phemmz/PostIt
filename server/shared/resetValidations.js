import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * sharedSignupValidations class
 */
export default class sharedResetValidations {
/**
 * commonValidations() takes in the data from the body for resetting
 * password and validates them
 * @param {object} data
 * @return {object} errors
 * @returns {object} errors,isValid
 */
  static commonValidations(data) {
    const errors = {};
    if (!data.password) {
      errors.password = 'Please fill in your password';
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
    if (!data.passwordConfirmation) {
      errors.passwordConfirmation = 'Please fill in your password';
    }
    if (data.password && data.passwordConfirmation) {
      if (data.password.trim() !== data.passwordConfirmation.trim()) {
        errors.passwordConfirmation = 'Passwords must match!!';
      }
    }
    if (!data.passwordConfirmation) {
      errors.invalid = 'Password Confirmation is required';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
