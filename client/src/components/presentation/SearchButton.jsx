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
        to=""
        className="searchbtn waves-effect waves-light btn center"
      >Search for users</Link>
    </div>
  );
};

export default SearchButton;
