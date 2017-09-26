'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../../data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = _models2.default.Group;

/**
 * @description checkUserInGroup class
 */

var checkUserInGroup = function () {
  function checkUserInGroup() {
    _classCallCheck(this, checkUserInGroup);
  }

  _createClass(checkUserInGroup, null, [{
    key: 'isGroupMember',

    /**
     * @description isGroupMember checks if a user belongs to a group
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {object} json
     */
    value: function isGroupMember(req, res, next) {
      if (isNaN(req.params.groupId)) {
        res.status(422).json({
          error: {
            message: 'Invalid groupId supplied'
          }
        });
      } else {
        Group.findOne({ where: { id: req.params.groupId } }).then(function (group) {
          if (group === null) {
            return res.status(400).json({
              confirmation: 'fail',
              message: 'Group does not exist'
            });
          }
          group.getUsers({ where: { username: req.currentUser.username } }).then(function (user) {
            if (user.length < 1) {
              return res.status(400).json({
                confirmation: 'fail',
                message: 'You dont belong to this group'
              });
            }
            return next();
          });
        });
      }
    }
  }]);

  return checkUserInGroup;
}();

exports.default = checkUserInGroup;