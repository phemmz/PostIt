import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SideNav = ({
  currentUser
}) => {
  return (
    <ul id="slide-out" className="side-nav groupdetails-nav" >
      <li>
        <h5
          className="white-text name user-size current-username"
        >{currentUser.username}</h5>
      </li>
      <li>
        <h5
          className="white-text email user-size current-email"
        >{currentUser.email}</h5>
      </li>
      <li>
        <Link
          to="/members"
          className="waves-effect waves-light green nav-anchor"
        >
          <i
            className="fa fa-users snav"
            aria-hidden="true"
          />Members</Link></li>
      <li><div className="divider" /></li>
      <li>
        <a
          href="#addUser"
          className="waves-effect waves-light green nav-anchor modal-trigger"
        >
          <i
            className="fa fa-user-plus snav"
            aria-hidden="true"
          />Add User</a></li>
    </ul>
  );
};

SideNav.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string
  }).isRequired
};

export default SideNav;
