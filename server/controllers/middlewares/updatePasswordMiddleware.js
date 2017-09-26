import sharedResetValidations from '../../shared/resetValidations';

/**
 * @description UpdatePasswordValidations class
 */
export default class UpdatePasswordValidations {
/**
 * @description it validates User's input fields
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
  static validateUserInput(req, res, next) {
    const { errors, isValid } =
      sharedResetValidations.commonValidations(req.body);
    if (!isValid) {
      res.status(422).json({
        errors
      });
    } else {
      next();
    }
  }
}
