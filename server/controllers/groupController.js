import Grp from '../data/models';

const Group = Grp.Group;

/**
 * 
 */
export default class GroupController {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   */
  static createGroup(req, res) {
    if (req.session.username) {
      Group
        .create({
          groupname: req.body.groupname,
        })
        .then((group) => {
          res.status(200).json({
            confirmation: 'success',
            message: `${req.body.groupname} successfully created`,
            result: group
          });
        })
        .catch((error) => {
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
}
