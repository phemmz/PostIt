import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import Models from '../../data/models';

const Group = Models.Group;

/**
 * @class GroupValidations
 */
export default class GroupValidations {

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
   * @description isGroupMember checks if a user belongs to a group
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns {object} json
   */
  static isGroupMember(request, response, next) {
    if (isNaN(request.params.groupId)) {
      response.status(422).json({
        error: {
          message: 'Invalid groupId supplied'
        }
      });
    } else {
      Group.findOne({ where: { id: request.params.groupId } })
        .then((group) => {
          if (group === null) {
            return response.status(400).json({
              confirmation: 'fail',
              message: 'Group does not exist'
            });
          }
          group.getUsers({ where: { username: request.currentUser.username } })
            .then((user) => {
              if (user.length < 1) {
                return response.status(400).json({
                  confirmation: 'fail',
                  message: 'You dont belong to this group'
                });
              }
              return next();
            });
        });
    }
  }
  /**
   * @description validates AddUser input fields
   * @param {object} userDetails
   * @returns {object} errors,isValid
   */
  static validateAddUser(userDetails) {
    const errors = {};
    if (userDetails.username) {
      if (Validator.isEmpty(userDetails.username.trim())) {
        errors.username = 'Username is required';
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
