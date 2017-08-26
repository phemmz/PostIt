import React from 'react';

const SideNav = ({
  currentUser
}) => {
  return (
    <ul id="slide-out" className="side-nav groupdetails-nav" >
      <li>
        <div className="user-view">
          <div className="background">
            <img
              className="groupdetails-img"
              src="https://images.unsplash.com/photo-1493219686142-5a8641badc78?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop="
              alt="groupdetails"
            />
          </div>
          <div>
            <a>
              <span
                className="white-text name"
                id="user-size"
              >{currentUser.username}</span>
            </a>
            <a>
              <span
                className="white-text email right"
                id="user-size"
              >{currentUser.email}</span>
            </a>
          </div>
        </div>
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
