import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class Validations {
/**
 * 
 * @param {object} data 
 */
  validateInput(data) {
    const errors = {};
    if (!data.username || !data.password || !data.username) {
      this.errors.invalid = 'Invalid input details';
    }
    if (Validator.isEmpty(data.username) || data.username === '' || data.username === null) {
      this.errors.username = 'Please fill in your username';
    }
    if (Validator.isEmpty(data.email) || data.email === null || data.email === '') {
      this.errors.email = 'Please fill in your email';
    }
    if (!Validator.isEmail(data.email)) {
      this.errors.email = 'Email is invalid';
    }
    if (data.password === null || data.password === '') {
      this.errors.password = 'Please fill in your password';
    }
    if (data.password.length <= 5) {
      this.errors.password = 'Password length must not be less than 6';
    }
    if (data.password === '' || data.password === null) {
      this.errors.passwordConfirmation = 'This field is required';
    }
    if (data.password !== data.passwordConfirmation) {
      this.errors.passwordConfirmation = 'Passwords must match';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
