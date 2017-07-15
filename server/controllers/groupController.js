import Models from '../data/models';

const Group = Models.Group;

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
  /**
 * 
 * @param {object} req 
 * @param {object} res 
 */
  static getGroup(req, res) {
    const user = req.session.username;
    if (req.session.username) {
      Group.findAll({
        where: {
          username: user
        }
      })
        .then((group) => {
          console.log(group);
          res.json({
            confirmation: 'success',
            results: group
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
        message: 'Please log in'
      });
    }
  }
}
