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

			list: []
		}
	}

	updateId(event) {
		let updatedId = Object.assign({}, this.state.messages);
		updatedId['groupId'] = event.target.value;
		this.setState({
			messages: updatedId
		})
	}

	updateMessage(event) {
		let updatedMessage = Object.assign({}, this.state.messages);
		updatedMessage[event.target.id] = event.target.value;
		this.setState({
			messages: updatedMessage
		})
	}

	sendMessage() {
		let updatedList = Object.assign([], this.state.list);
		updatedList.push(this.state.messages);
		this.setState({
			list: updatedList
		})
		console.log(JSON.stringify(this.state.list));
	}

	render() {
		const messageList = this.state.list.map((message, i) => {
			return (
				<li key={i}><Message currentMessage={message}/></li>
			)
		});
		return(
			<div className="welc box" style={{marginLeft: "2rem", marginTop: 0}}>
				<div className="welc msglist">
					<h4 className="green-text text-darken-4">Message Board Room</h4>					
					<ol style={{listStyle: "none"}}>
						{messageList}
					</ol>							
				</div>
				<div className="welc groupform">
					<h4 className="green-text text-darken-4 glist">Send Message</h4>					
					<div className="container">
						<div className="row">							
							<div className="input-field col s12">
								<input onChange={this.updateId.bind(this)} id="groupIds" type="text" className="form-control" />
								<label htmlFor="groupIds">Group Id</label>
							</div>
							<div className="input-field col s12">
								<input onChange={this.updateMessage.bind(this)} id="priority" type="text" className="form-control" />
								<label htmlFor="priority">Priority</label>																
							</div>
							<div className="input-field col s12">
								<input onChange={this.updateMessage.bind(this)} id="content" type="text" className="form-control" />
								<label htmlFor="content">Message</label>
								<button onClick={this.sendMessage.bind(this)} className="waves-effect waves-light btn">Send</button>								
							</div>
						</div>										
					</div>
				</div>
			</div>
		)
	}
}
export default Messages;