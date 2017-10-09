import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * sharedSignupValidations class
 */
export default class sharedSignupValidations {
/**
 * commonValidations() takes in the data from the body for signup and
 * validates them
 * @param {object} userDetails
 * @return {object} errors
 * @returns {object} errors,isValid
 */
  static commonValidations(userDetails) {
    const errors = {};
    if (!userDetails.username) {
      errors.username = 'Please fill in your username';
    }
    if (userDetails.username) {
      if (Validator.isEmpty(userDetails.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!userDetails.phoneNumber) {
      errors.phoneNumber = 'Please fill in your phone number';
    }
    if (userDetails.phoneNumber) {
      if (Validator.isEmpty(userDetails.phoneNumber.trim())) {
        errors.phoneNumber = 'Please fill in your phone number';
      }
    }
    if (!userDetails.email) {
      errors.email = 'Please fill in your email';
    }
    if (userDetails.email && !Validator.isEmail(userDetails.email)) {
      errors.email = 'Email is invalid';
    }
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
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
