import React, { Component } from 'react';
import { Link } from 'react-router';

class Group extends Component {
	render() {
		return(
			<div>				
				<span className="z-depth-1 glist" style={{marginRight: 10}}><Link to={"/messageboard/"+this.props.currentGroup.id}><em>Group Name: </em>{this.props.currentGroup.groupname}</Link></span>
				<span className="z-depth-1 glist" style={{marginLeft: 70, border: 30}}><em>Group Id: </em>{this.props.currentGroup.id}</span>
			</div>
		)	
	}
}
export default Group;