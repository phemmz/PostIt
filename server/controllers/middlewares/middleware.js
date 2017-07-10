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
  static validateInput(data) {
    let errors = {};
    if (!data.username || !data.email || !data.password || !data.passwordConfirmation) {
      errors.invalid = 'Invalid input details';
      console.log("test1");
    }
    if (data.username === null || data.username === ' ') {
      console.log("test2");
      errors.username = 'Please fill in your username';
    }
    if (data.email === null || data.email === ' ') {
      console.log("test3");
      errors.email = 'Please fill in your email';
    }
    if (data.email && !Validator.isEmail(data.email)) {
      console.log("test4");
      errors.email = 'Email is invalid';
    }
    if (data.password === null || data.password === '') {
      console.log("test5");
      errors.password = 'Please fill in your password';
    }
    if (data.password && data.password.length <= 5) {
      console.log("test6");
      errors.password = 'Password length must not be less than 6';
    }
    if (data.password === '' || data.password === null) {
      console.log("test7");
      errors.passwordConfirmation = 'This field is required';
    }
    if (data.password !== data.passwordConfirmation) {
      console.log("test8");
      errors.passwordConfirmation = 'Passwords must match!!';
    }

    return {
      errors: errors,
      isValid: isEmpty(errors)
    };
  }

  static validateUserInput(req, res, next){
    let {errors, isValid} = Validations.validateInput(req.body)
    console.log(errors);
    if(!isValid){
      console.log(isValid, "yea this is the value");
      
      res.status(422).json(errors);
    } else {
       next();
    }
   
  }
}
