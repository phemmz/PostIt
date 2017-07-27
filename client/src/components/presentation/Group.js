import React, { Component } from 'react';
import { Link } from 'react-router';

class Group extends Component {
	render() {
		return(
			<div>				
				<span className="z-depth-1"><Link to={"/messageboard/"+this.props.currentGroup.id}>{this.props.currentGroup.groupname}</Link></span>
			</div>
		)	
	}
}
export default Group;