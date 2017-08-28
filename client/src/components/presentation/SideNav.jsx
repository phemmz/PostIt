import React from 'react';

const SideNav = ({
  currentUser
}) => {
  return (
    <ul id="slide-out" className="side-nav groupdetails-nav" >
      <li>
        <h5
          className="white-text name"
          id="user-size"
        >{currentUser.username}</h5>
      </li>
      <li>
        <h5
          className="white-text email"
          id="user-size"
        >{currentUser.email}</h5>
      </li>
      <li>
        <a
          href="#!"
          className="waves-effect waves-light green nav-anchor"
        ><i className="fa fa-users snav" aria-hidden="true" />Group Members</a></li>
      <li><div className="divider" /></li>
      <li>
        <a
          href="#addUser"
          className="waves-effect waves-light green nav-anchor modal-trigger"
        ><i className="fa fa-user-plus snav" aria-hidden="true" />Add User</a></li>
    </ul>
  );
};

export default SideNav;
