import React from 'react';
import PropTypes from 'prop-types';

/**
 * SearchedUser
 * @return {*} div
 */
const SearchedUser = ({ user }) => {
  return (
    <div className="card search-user center green-text text-darken-4">
      <span>Username: {user.username}</span>
      <br />
      <span>Email: {user.email}</span>
      <br />
      <span>Phone Number: {user.phoneNumber}</span>
    </div>
  );
};

SearchedUser.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired
};

export default SearchedUser;
