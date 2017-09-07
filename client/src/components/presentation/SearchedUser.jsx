import React from 'react';

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

export default SearchedUser;
