'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = _models2.default.Group;
var User = _models2.default.User;

/**
 * @description This class performs create and read functions for group
 */

var GroupController = function () {
  function GroupController() {
    _classCallCheck(this, GroupController);
  }

  _createClass(GroupController, null, [{
    key: 'createGroup',

    /**
     * @description This method creates a new group based on some validations
     * @param {object} req
     * @param {object} res
     * @returns {object} json
     */
    value: function createGroup(req, res) {
      /**
       * @description Creates a new group
       */
      Group.create({
        groupname: req.body.groupname.toLowerCase()
      }).then(function (group) {
        /**
         * @description Query the User model for the current user
         */
        User.findOne({
          where: { username: req.currentUser.username }
        }).then(function (user) {
          /**
           * @description The user gets added to the group as
           * the group creator
           */
          group.addUser(user).then(function () {
            res.status(201).json({
              confirmation: 'success',
              message: req.body.groupname + ' successfully created',
              result: group
            });
          });
        });
      })
      /**
       * @description The catch block catches error if the
       * groupname is not unique
       */
      .catch(function () {
        res.status(409).json({
          confirmation: 'fail',
          message: 'That group name already exist'
        });
      });
    }
    /**
     * @description This method adds a user to a particular group
     * @param {object} req
     * @param {object} res
     * @returns {object} json
     */

  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      /**
       * @description Finds the particular group by its id
       */
      Group.findOne({ where: { id: req.params.groupId } }).then(function (group) {
        /**
         * @description Checks if the group exist or not
         */
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          /**
           * @description If the group exists, check if the user
           * is a registered user
           */
          User.findOne({
            where: { username: req.body.username }
          }).then(function (user) {
            /**
             * @description Returns json object with status 404,
             * if the user is not a registered user
             */
            if (user === null) {
              res.status(404).json({
                confirmation: 'fail',
                message: 'User does not exist'
              });
            } else {
              /**
               * @description If the user exist,
               */
              group.addUser(user).then(function (added) {
                /**
                 * @description Checks if the user is already
                 * added to the group
                 */
                if (added.length === 0) {
                  res.status(400).json({
                    confirmation: 'fail',
                    message: 'User already exists'
                  });
                } else {
                  /**
                   * @description If not return a json object with
                   * status 201
                   */
                  res.status(201).json({
                    confirmation: 'success',
                    message: 'User added successfully'
                  });
                }
              }).catch(function () {
                res.status(400).json({
                  confirmation: 'fail',
                  message: 'Failed to add user'
                });
              });
            }
          });
        }
      }).catch(function () {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Invalid'
        });
      });
    }
    /**
     * @description Gets all the group(s) a user belongs to
     * @param {object} req
     * @param {object} res
     * @return {*} json
     */

  }, {
    key: 'getGroup',
    value: function getGroup(req, res) {
      User.findOne({
        where: { username: req.currentUser.username }
      }).then(function (user) {
        user.getGroups({
          where: {}
        }).then(function (data) {
          if (data.length < 1) {
            res.status(404).json({
              confirmation: 'fail',
              message: 'You currently dont belong to any group'
            });
          } else {
            var groups = [];
            data.map(function (group) {
              return groups.push({
                id: group.id,
                groupname: group.groupname
              });
            });
            res.status(200).json({
              confirmation: 'success',
              results: groups
            });
          }
        }).catch(function (error) {
          res.status(404).json({
            confirmation: 'fail',
            message: error
          });
        });
      }).catch(function (error) {
        res.status(404).json({
          confirmation: 'fail',
          message: error
        });
      });
    }
    /**
     * @description gets all the members of a group
     * @param {*} req
     * @param {*} res
     * @return {*} json
     */

  }, {
    key: 'groupMembers',
    value: function groupMembers(req, res) {
      Group.findOne({
        where: {
          id: req.params.groupId
        }
      }).then(function (group) {
        group.getUsers({
          where: {}
        }).then(function (users) {
          var members = [];
          users.map(function (member) {
            return members.push({
              id: member.id,
              username: member.username,
              email: member.email,
              phoneNumber: member.phoneNumber
            });
          });
          var PER_PAGE = 5;
          var offset = req.params.offset ? parseInt(req.params.offset, 10) : 0;
          var nextOffset = offset + PER_PAGE;
          var previousOffset = offset - PER_PAGE < 1 ? 0 : offset - PER_PAGE;
          var metaData = {
            limit: PER_PAGE,
            next: _util2.default.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
            offset: req.params.offset,
            previous: _util2.default.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
            total_count: members.length
          };
          var getPaginatedItems = members.slice(offset, offset + PER_PAGE);
          res.status(200).json({
            confirmation: 'success',
            members: members,
            metaData: metaData,
            paginatedMembers: getPaginatedItems
          });
        }).catch(function (err) {
          res.status(400).json({
            confirmation: 'fail',
            message: err.name
          });
        });
      }).catch(function () {
        res.status(400).json({
          confirmation: 'fail',
          message: 'Failed to get group members'
        });
      });
    }
  }]);

  return GroupController;
}();

exports.default = GroupController;