import React, { Component } from 'react';

class Group extends Component {
	render() {
		return(
			<div>				
				<span className="z-depth-1 glist" style={{marginRight: 10}}><a href=""><em>Group Name: </em>{this.props.currentGroup.groupname}</a></span>
				<span className="z-depth-1 glist" style={{marginLeft: 70, border: 30}}><em>Group Id: </em>{this.props.currentGroup.id}</span>
			</div>
		)	
	}
}
export default Group;