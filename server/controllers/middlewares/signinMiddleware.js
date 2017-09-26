import sharedSigninValidations from '../../shared/loginValidations';
/**
 * @description SigninValidations class
 */
export default class SigninValidations {
/**
 * @description validates User Input
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } =
      sharedSigninValidations.validateSignin(req.body);
    if (!isValid) {
      res.status(422).json({
        errors
      });
    } else {
      next();
    }
  }
}
