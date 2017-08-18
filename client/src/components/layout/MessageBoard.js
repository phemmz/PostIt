import React, { Component } from 'react';
import Messages from '../containers/Messages';


class MessageBoard extends Component {

	render() {
		return (
			<div className="container">					
			    <Messages />
			</div>
		)
	}
}
export default MessageBoard