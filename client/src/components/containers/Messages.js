import React, { Component } from 'react';
import Message from '../presentation/Message';

class Messages extends Component {
	constructor() {
		super();
		this.state = {
			messages: {
				content: '',
				groupId: '',
				readCheck: '',
				priority: ''
			},

			list: [
				{content: "Yu should do this today", groupId: 1, priority: 2},
				{content: "Am going out", groupId: 1, priority: 1},
				{content: "When is your birthday", groupId: 3, priority: 0}
			]
		}
	}

	render() {
		const messageList = this.state.list.map((message, i) => {
			return (
				<li key={i}><Message currentMessage={message}/></li>
			)
		});
		return(
			<div className="welc msgbox">
				<div className="welc msglist">
					<h4 className="green-text text-darken-4">Message Board Room</h4>					
					<ol>
						{messageList}
					</ol>							
				</div>
				<div className="welc groupform">
					<h4 className="green-text text-darken-4 glist">Send Message</h4>					
					<div className="container">
						<div className="row">							
							<div className="input-field col s12">
								<input id="groupId" type="text" className="form-control" />
								<label htmlFor="groupId">Group Id</label>
							</div>
							<div className="input-field col s12">
								<input id="content" type="text" className="form-control" />
								<label htmlFor="content">Message</label>
								<button className="waves-effect waves-light btn">Send</button>								
							</div>
						</div>										
					</div>
				</div>
			</div>
		)
	}
}
export default Messages;