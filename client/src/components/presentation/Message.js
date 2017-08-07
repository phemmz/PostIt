import React, { Component } from 'react';

class Message extends Component {
	render() {
		return (
			<div>
				<h4 className="green-text text-darken-4"><strong><em>{this.props.groupName}</em></strong></h4>	
				<h4>{this.props.groupMessages}</h4>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>{this.props.currentMessage.content}</span>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>GroupId: {this.props.currentMessage.groupId}</span>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>Priority: {this.props.currentMessage.priority}</span>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>{this.props.currentMessage.messagecreator}</span>
			</div>
		)
	}
}
export default Message;