import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * sharedSignupValidations class
 */
export default class sharedResetValidations {
/**
 * commonValidations() takes in the data from the body for resetting
 * password and validates them
 * @param {object} userDetails
 * @return {object} errors
 * @returns {object} errors,isValid
 */
  static commonValidations(userDetails) {
    const errors = {};
    if (!userDetails.password) {
      errors.password = 'Please fill in your password';
    }
    if (userDetails.password) {
      if (Validator.isEmpty(userDetails.password.trim())) {
        errors.password = 'Please fill in your password';
      }
    }
    if (userDetails.passwordConfirmation) {
      if (Validator.isEmpty(userDetails.passwordConfirmation.trim())) {
        errors.password = 'This field is required';
      }
    }
    if (userDetails.password && userDetails.password.length <= 5) {
      errors.password = 'Password length must not be less than 6 characters';
    }
    if (!userDetails.passwordConfirmation) {
      errors.passwordConfirmation = 'Please fill in your password';
    }
    if (userDetails.password && userDetails.passwordConfirmation) {
      if (userDetails.password.trim() !==
        userDetails.passwordConfirmation.trim()) {
        errors.passwordConfirmation = 'Passwords must match!!';
      }
    }
    if (!userDetails.passwordConfirmation) {
      errors.invalid = 'Password Confirmation is required';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
