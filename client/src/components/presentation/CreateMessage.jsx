import React, { Component } from 'react';

/**
 * CreateMessage Class
 */
class CreateMessage extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
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
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  /**
   * @description updateMessage is attached to onChange of textarea and select dropdown
   * It gets there value on change and set it to the state
   * @param {*} e
   * @return {*} void
   */
  updateMessage(e) {
    const updatedMessage = Object.assign({}, this.state.messages);
    updatedMessage[e.target.id] = e.target.value;
    updatedMessage.groupId = this.props.selectedGroup;
    this.setState({
      messages: updatedMessage
    });
  }
/**
 * @description calls the props from the parent component
 * and pass along this.state.messages
 * then clears the textfield
 * @return {*} void
 */
  sendMessage() {
    this.props.onCreate(this.state.messages);
    this.refs.messages.value = '';
    this.setState({
      messages: {
        content: '',
        groupId: '',
        readCheck: false,
        priority: '1'
      }
    });
  }
  /**
   * render
   * @return {*} void
   */
  render() {
    let content = null;
    if (this.props.selectedGroup) {
      content =
        (<div className="comment valign-wrapper center-align">
          <div id="message-input" className="col s12">
            <div className="row">
              <div className="input-field col s12 l4">
                <select
                  id="priority"
                  value={this.state.messages.priority}
                  onChange={this.updateMessage}
                  style={{ display: 'block' }}
                >
                  <option value="" disabled>Select Priority</option>
                  <option value="1">Normal</option>
                  <option value="2">Urgent</option>
                  <option value="3">Critical</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col s10">
                <textarea
                  ref="messages"
                  onChange={this.updateMessage}
                  id="content"
                  className="validate"
                  defaultValue={''}
                />
              </div>
              <div className="col s2">
                <a
                  onClick={this.sendMessage}
                  className="btn-floating green"
                  role="link"
                  tabIndex={0}
                ><i className="large material-icons">chat</i></a>
              </div>
            </div>
          </div>
        </div>);
    }
    return content;
  }
}

export default CreateMessage;