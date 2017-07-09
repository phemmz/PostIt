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

/**
 * 
 */

var GroupCtrl = function () {
  function GroupCtrl() {
    _classCallCheck(this, GroupCtrl);
  }

  _createClass(GroupCtrl, null, [{
    key: 'createGroup',

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     */
    value: function createGroup(req, res) {
      if (req.session.username) {
        Group.create({
          groupname: req.body.groupname
        }).then(function (group) {
          res.json({
            confirmation: req.body.groupname + ' successfully created',
            result: group
          });
        }).catch(function (error) {
          res.json({
            confirmation: 'fail',
            message: error
          });
        });
      } else {
        res.status(401).json({
          confirmation: 'fail',
          message: 'Please sign in to create a group'
        });
      }
    }
  }]);

  return GroupCtrl;
}();

exports.default = GroupCtrl;