import React from 'react';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';

/**
 * Home
 * @return {*} div
 */
const SearchButton = () => {
  return (
    <div className="center">
      <ReactTooltip />
      <Link
        to="/search"
        className="searchbtn waves-effect waves-light btn center search-users"
        data-tip="Search Users"
      >Search Users</Link>
    </div>
  );
};

export default SearchButton;
