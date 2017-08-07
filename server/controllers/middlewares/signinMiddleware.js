import sharedSigninValidations from '../../shared/loginValidations';
/**
 * SigninValidations class
 */
export default class SigninValidations {
/**
 * validateUserInput()
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = sharedSigninValidations.validateSignin(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
