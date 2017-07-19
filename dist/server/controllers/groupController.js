'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = _models2.default.Group;
var User = _models2.default.User;

/**
 * This class performs create and read functions for group
 */

var GroupController = function () {
  function GroupController() {
    _classCallCheck(this, GroupController);
  }

  _createClass(GroupController, null, [{
    key: 'createGroup',

    /**
     * This method creates a new group based on some validations
     * @param {object} req 
     * @param {object} res 
     */
    value: function createGroup(req, res) {
      if (req.session.username) {
        Group.create({
          groupname: req.body.groupname
        }).then(function (group) {
          User.findOne({
            where: { username: req.session.username }
          }).then(function (user) {
            group.addUser(user).then(function () {
              res.status(201).json({
                confirmation: 'success',
                message: req.body.groupname + ' successfully created'
              });
            });
          });
        }).catch(function () {
          res.status(409).json({
            confirmation: 'fail',
            message: 'That group name already exist'
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please sign in to create a group'
        });
      }
    }
    /**
     * This method adds a user to a particular group
     * @param {object} req 
     * @param {object} res 
     */

  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      Group.findOne({ where: { id: req.params.groupId } }).then(function (group) {
        if (group === null) {
          res.status(404).json({
            confirmation: 'fail',
            message: 'Group does not exist'
          });
        } else {
          User.findOne({
            where: { username: req.body.username }
          }).then(function (user) {
            if (user === null) {
              res.status(404).json({
                confirmation: 'fail',
                message: 'User does not exist'
              });
            } else {
              group.addUser(user).then(function (added) {
                if (added.length === 0) {
                  res.status(400).json({
                    confirmation: 'fail',
                    message: 'User already exists'
                  });
                } else {
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
    * 
    * @param {object} req 
    * @param {object} res 
    */

  }, {
    key: 'getGroup',
    value: function getGroup(req, res) {
      if (req.session.username) {
        User.findOne({
          where: { username: req.session.username }
        }).then(function (user) {
          user.getGroups({
            where: {}
          }).then(function (groups) {
            if (groups.length < 1) {
              res.status(200).json({
                confirmation: 'success',
                results: 'You currently dont belong to any group'
              });
            } else {
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
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please log in'
        });
      }
    }
  }]);

  return GroupController;
}();

exports.default = GroupController;