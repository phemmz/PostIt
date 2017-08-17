import React, { Component } from 'react';
import axios from 'axios';

class CreateMessage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			messages: {
				content: '',
				groupId: '',
				readCheck: false,
				priority: '1'
			},
     
			list: []
		}
    this.updateMessage = this.updateMessage.bind(this);
	}
  /**
	 * @description updateMessage is attached to onChange of textarea and select dropdown
   * It gets there value on change and set it to the state
	 * @param {*} e 
	 */
  updateMessage(e) {
		let updatedMessage = Object.assign({}, this.state.messages);
		updatedMessage[e.target.id] = e.target.value;
    updatedMessage['groupId'] = this.props.selectedGroup;
		this.setState({
			messages: updatedMessage
		})
	}
/**
 * @description calls the props from the parent component
 * and pass along this.state.messages
 * then clears the textfield
 * @param {*} e 
 */
  sendMessage(e) {
    this.props.onCreate(this.state.messages);
    this.refs.messages.value = "";
    this.setState({
			messages: {
				content: '',
				groupId: '',
				readCheck: false,
				priority: '1'
			}
		})
	}

  render() {
    let content = null;
    if (this.props.selectedGroup) {
      content = 
        <div className="comment valign-wrapper center-align">
          <div id="message-input" className="col l12">
            <div className="row">
              <div className="input-field col s5">
                <select id="priority" value={this.state.messages.priority} onChange={this.updateMessage} style={{display: 'block'}}>
                  <option value="" disabled>Select Priority</option>
                  <option value="1">Normal</option>
                  <option value="2">Urgent</option>
                  <option value="3">Critical</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col s10">
                <textarea ref="messages" onChange={this.updateMessage} id="content" className="validate" defaultValue={""} />
              </div>
              <div className="col s2">
                <a onClick={this.sendMessage.bind(this)} className="btn-floating green"><i className="large material-icons">chat</i></a>
              </div>
            </div>
          </div>
        </div>
    } 
    return content;
  }
}

export default CreateMessage;