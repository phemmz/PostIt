import React, { Component } from 'react';
import { Link } from 'react-router';

class Group extends Component {
	onSelectTitle(event) {
    event.preventDefault(); 
		console.log('onselectitle: ' + this.props.index);
    this.props.select(this.props.index);
	}

	render() {
		const title = (this.props.isSelected) ? <a style={{color: 'red'}}>{this.props.currentGroup.groupname}</a> : <a>{this.props.currentGroup.groupname}</a>
		return(
			<div>	
				<h3 onClick={this.onSelectTitle.bind(this)}><span className="z-depth-1">{ title }</span></h3>			
			</div>
		)	
	}
}
export default Group;