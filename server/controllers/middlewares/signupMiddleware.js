import sharedSignupValidations from '../../shared/signupvalidations';

/**
 * 
 */
export default class SignupValidations {
/**
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = sharedSignupValidations.validateSignup(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
