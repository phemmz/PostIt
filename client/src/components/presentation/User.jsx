import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description User Component
 * @return {*} div
 */
const User = ({ user }) => {
  return (
    <div className="card search-user center green-text text-darken-4">
      <span className="username">Username: {user.username}</span>
      <br />
      <span className="email">Email: {user.email}</span>
      <br />
      <span className="phoneNumber">Phone Number: {user.phoneNumber}</span>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired
};

export default User;
