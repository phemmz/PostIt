import Models from '../../data/models';

const Group = Models.Group;

/**
 * 
 */
export default class checkUserInGroup {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static isGroupMember(req, res, next) {
    Group.findOne({ where: { id: req.params.groupId } })
      .then((group) => {
        group.getUsers({ where: { username: req.session.username } })
          .then((user) => {
            if (user.length < 1) {
              return res.status(400).json({
                confirmation: 'fail',
                message: 'You dont belong to this group, you cant add a user'
              });
            }
            return next();
          });
      });
  }
}
