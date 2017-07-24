import sharedSigninValidations from '../../shared/loginValidations';
/**
 *
 */
export default class SigninValidations {
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
