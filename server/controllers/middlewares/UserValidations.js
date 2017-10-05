import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import Model from '../../data/models';

const User = Model.User;

/**
 * @class Validations
 */
export default class UserValidations {

  /**
   * @description This function verifies the token
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns {object} json
   */
  static authenticate(request, response, next) {
    const authorizationHeader = request.headers.authorization;
    let token;
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }
    /**
     * @description Checks if there is token and verifies the token
     * Should return decoded if token is valid
     */
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          response.status(401).json({
            error: 'Failed to authenticate'
          });
        } else {
          User.findOne({
            where: {
              $or: [
                { id: decoded.userId },
                { email: decoded.email }
              ]
            }
          })
            .then((user) => {
              if (!user) {
                response.status(404).json({
                  error: 'No such user'
                });
              } else {
                request.currentUser = {
                  email: user.email,
                  username: user.username,
                  id: user.id
                };
                next();
              }
            });
        }
      });
    } else {
      response.status(403).json({
        error: 'Please signin/signup'
      });
    }
  }
  /**
   * @description validateSignup() validates user inputs for signup
   * and also checks if the username and email already exist on the database
   * @param {*} userDetails
   * @param {*} otherValidations
   * @returns {object} json
   */
  static validateSignup(userDetails, otherValidations) {
    /**
     * @description Deconstruct all errors from otherValidations
     */
    const { errors } = otherValidations(userDetails);
    /**
     * Promise.all returns a single promise for the 2 database calls
     */
    return Promise.all([
      /**
       * Checks if the username already exists
       */
      User.findOne({
        where: {
          username: userDetails.username
        }
      })
      .then((user) => {
        if (user) {
          errors.username = 'Another user exist with this username';
        }
      }),
      /**
       * @description Checks if the email already exists
       */
      User.findOne({
        where: {
          email: userDetails.email
        }
      })
      .then((user) => {
        if (user) {
          errors.email = 'Another user exist with this email';
        }
      })
    ]).then(() => {
      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
  }
  /**
   * @description validates users input fields
   * @param {object} groupDetails
   * @returns {object} errors,isValid
   */
  static validateCreateGroup(groupDetails) {
    const errors = {};
    if (groupDetails.groupname) {
      if (Validator.isEmpty(groupDetails.groupname.trim())) {
        errors.groupname = 'Please fill in your groupname';
      }
    }
    if (!groupDetails.groupname) {
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
  /**
   * @description validates user input fields
   * @param {object} userDetails
   * @returns {object} errors,isValid
   */
  static validateResetPassword(userDetails) {
    const errors = {};
    if (userDetails.username) {
      if (Validator.isEmpty(userDetails.username.trim())) {
        errors.username = 'Please fill in your username';
      }
    }
    if (!userDetails.username) {
      errors.invalid = 'Please fill in your details';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
