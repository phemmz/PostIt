import Models from '../../data/models';

const Group = Models.Group;

/**
 * @description checkUserInGroup class
 */
export default class checkUserInGroup {
  /**
   * @description isGroupMember checks if a user belongs to a group
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} json
   */
  static isGroupMember(req, res, next) {
    if (isNaN(req.params.groupId)) {
      res.status(422).json({
        error: {
          message: 'Invalid groupId supplied'
        }
      });
    } else {
      Group.findOne({ where: { id: req.params.groupId } })
        .then((group) => {
          if (group === null) {
            return res.status(400).json({
              confirmation: 'fail',
              message: 'Group does not exist'
            });
          }
          group.getUsers({ where: { username: req.currentUser.username } })
            .then((user) => {
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
}
