import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 */
export default class Validations {
  /**
   * 
   */
  constructor() {
    this.errors = {};
  }
/**
 * 
 * @param {object} data 
 */
  validateInput(data) {
    if (!data.username || !data.email || !data.password || !data.passwordConfirmation) {
      this.errors.invalid = 'Invalid input details';
    }
    if (data.username === null || data.username === ' ') {
      this.errors.username = 'Please fill in your username';
    }
    if (data.email === null || data.email === ' ') {
      this.errors.email = 'Please fill in your email';
    }
    if (data.email && !Validator.isEmail(data.email)) {
      this.errors.email = 'Email is invalid';
    }
    if (data.password === null || data.password === '') {
      this.errors.password = 'Please fill in your password';
    }
    if (data.password && data.password.length <= 5) {
      this.errors.password = 'Password length must not be less than 6';
    }
    if (data.password === '' || data.password === null) {
      this.errors.passwordConfirmation = 'This field is required';
    }
    if (data.password !== data.passwordConfirmation) {
      this.errors.passwordConfirmation = 'Passwords must match!!';
    }

    return {
      errors: this.errors,
      isValid: isEmpty(this.errors)
    };
  }
}
