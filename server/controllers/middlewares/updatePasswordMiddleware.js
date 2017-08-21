import sharedResetValidations from '../../shared/resetValidations';

/**
 * UpdatePasswordValidations class
 */
export default class UpdatePasswordValidations {
/**
 * validateUserInput()
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } = sharedResetValidations.commonValidations(req.body);
    if (!isValid) {
      res.status(422).json(errors);
    } else {
      next();
    }
  }
}
