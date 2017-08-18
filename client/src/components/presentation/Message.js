import React, { Component } from 'react';

class Message extends Component {
	render() {
		return (
			<div className="email-content-wrap">
				<div className="row">
					<div className="col s12 m10 l10 msg-position">
						<ul className="collection">
							<li className="collection-item avatar">
								<span className="circle green lighten-1 center">{this.props.currentMessage.messagecreator[0]}</span>
								<span className="email-title">{this.props.currentMessage.messagecreator}</span>
								<p className="grey-text ultra-small">Priority: {this.props.currentMessage.priority}</p>
								<p className="grey-text ultra-small">{new Date(this.props.currentMessage.createdAt).toLocaleString()}</p>
								<span className="email-content">{this.props.currentMessage.content}</span>
							</li>
						</ul>
					</div>
				</div>
				<hr />
			</div>
		)
	}
}
export default Message;