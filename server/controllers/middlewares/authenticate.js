import jwt from 'jsonwebtoken';
import Model from '../../data/models';

const User = Model.User;
/**
 * This function verifies the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} json
 */
export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  /**
   * Checks if there is token and verifies the token
   * Should return decoded if token is valid
   */
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
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
              res.status(404).json({
                error: 'No such user'
              });
            } else {
              req.currentUser = { email: user.email, username: user.username, id: user.id };
              next();
            }
          });
      }
    });
  } else {
    res.status(403).json({
      error: 'Please signin/signup'
    });
  }
};
