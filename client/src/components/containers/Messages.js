import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { CreateMessage, Message } from '../presentation';

class Messages extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}
  componentDidMount() {
    // const groupId = this.state.messages.groupId;
    // console.log(this.state.messages.groupId, 'helloankskask');
    // axios.get(`api/group/20/messages`)
    //   .then((response) => {
    //     this.setState({
    //       list: response.data.results
    //     });
    //   })
    //   .catch((err) => {
    //     alert('ERROR: ' + err.message)
    //   });
  }

  handleRedirect() {
    browserHistory.push('/dashboard');
  }

	sendMessage(messages) {
    console.log('hashiash8ahs'+JSON.stringify(messages));
		const groupId = messages.groupId;
    console.log(groupId);
		axios.post(`/api/group/${groupId}/message`, messages)
		  .then((response) => {
			let updatedList = Object.assign([], this.state.list);
			updatedList.push(response.data.results);
			this.setState({
				list: updatedList
			});
    });	
	}

	render() {
		const messageList = this.state.list.map((message, i) => {
			return (
				<li key={i}><Message currentMessage={message}/></li>
			)
		});
		return(
			<div>
				<div>
					<h4 className="green-text text-darken-4">Message Board Room</h4>					 
					<ol style={{listStyle: "none"}}>
						{messageList}
					</ol>							
				</div>
        <CreateMessage onCreate={this.sendMessage.bind(this)} />
			</div>
		)
	}
}
export default Messages;