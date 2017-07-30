import React, { Component } from 'react';
import axios from 'axios';

class CreateMessage extends Component {
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

  updateMessage(event) {
		let updatedMessage = Object.assign({}, this.state.messages);
		updatedMessage[event.target.id] = event.target.value;
		this.setState({
			messages: updatedMessage
		})
	}

  sendMessage() {
    console.log('submitMessage: ' + JSON.stringify(this.state.messages));
		this.props.onCreate(this.state.messages);
	}

  render() {
    return (
      <div>
        <h4 className="green-text text-darken-4">Send Message</h4>					
        <div className="container">
          <div className="row">
            <div className="input-field col s8">
              <input onChange={this.updateMessage.bind(this)} id="priority" type="text" className="form-control" />
              <label htmlFor="priority">Priority</label>																
            </div>
            <div className="input-field col s8">
              <input onChange={this.updateMessage.bind(this)} id="content" type="text" className="form-control" />
              <label htmlFor="content">Message</label>
              <button onClick={this.sendMessage.bind(this)} className="waves-effect waves-light btn">Send</button>								
            </div>
          </div>										
        </div>
      </div>
    )
  }
}

export default CreateMessage;