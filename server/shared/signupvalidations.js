import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * sharedSignupValidations class
 */
export default class sharedSignupValidations {
/**
 * commonValidations() takes in the data from the body for signup and validates them
 * @param {object} data
 * @return {object} errors
 * @returns {object} errors,isValid
 */
  static commonValidations(data) {
    const errors = {};
    if (!data.username) {
      errors.username = 'Please fill in your username';
    }
    if (data.username) {
      if (Validator.isEmpty(data.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!data.email) {
      errors.email = 'Please fill in your email';
    }
    if (data.email && !Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
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
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
