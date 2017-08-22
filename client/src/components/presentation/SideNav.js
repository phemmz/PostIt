import React, { Component } from 'react';

class SideNav extends Component {
	render() {
		return (
      <ul id="slide-out" className="side-nav groupdetails-nav" >
        <li>
          <div className="user-view">
            <div className="background">
              <img className="groupdetails-img" src="https://images.unsplash.com/photo-1493219686142-5a8641badc78?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop="/>
            </div>
            <div>
              <a href="#!user"><img className="circle" src=""/></a>
              <a href="#!name"><span className="white-text name">{this.props.currentUser.username}</span></a>
              <a href="#!email"><span className="white-text email right">{this.props.currentUser.email}</span></a>
            </div>
          </div>
        </li>
        <li><a href="#!" className="waves-effect waves-light green nav-anchor"><i className="material-icons">cloud</i>Group Members</a></li>
        <li><div className="divider"></div></li>
        <li><a href="#addUser" className="waves-effect waves-light green nav-anchor modal-trigger"><i className="material-icons">people_outline</i>Add User</a></li>
      </ul>
		)
	}
}
export default SideNav;