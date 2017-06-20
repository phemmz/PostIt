import React, { Component } from 'react';

class Message extends Component {
	render() {
		return (
			<div>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>{this.props.currentMessage.content}</span>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>GroupId: {this.props.currentMessage.groupId}</span>
				<span className="z-depth-1 glist" style={{marginRight: 10}}>Priority: {this.props.currentMessage.priority}</span>
			</div>
		)
	}
}
export default Message;