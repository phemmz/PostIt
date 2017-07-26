import jwt from 'jsonwebtoken';
import Model from '../../data/models';

const User = Model.User;

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Failed to authenticate'
        });
      } else {
        User.findOne({
          where: {
            id: decoded.userId
          }
        })
          .then((user) => {
            if (!user) {
              return res.status(404).json({
                error: 'No such user'
              });
            }
            req.currentUser = { email: user.email, username: user.username, id: user.id };
            next();
          });
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
};
