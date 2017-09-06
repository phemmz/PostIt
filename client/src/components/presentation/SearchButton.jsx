import React from 'react';
import { Link } from 'react-router';

/**
 * Home
 * @return {*} div
 */
const SearchButton = () => {
  return (
    <div className="center">
      <Link
        to="/search"
        className="searchbtn waves-effect waves-light btn center search-users"
      >Search For Users</Link>
    </div>
  );
};

export default SearchButton;
