import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * AddUserModal class
 */
class AddUserModal extends Component {
	render() {
		return (
			<div id="addUser" className="modal">
        <div className="modal-content">
          <h4 className="green-text text-darken-4">Add User to a Group</h4>
          <div className="row">
            <div className="input-field col s12">
              <select ref="dropdown" id="username" value={this.props.value} onChange={this.props.onChange} style={{display: 'block'}}>
                <option value="" disabled>Add User</option>
                {/* Populate the select dropdown with registered users  */}
                {this.props.appUsers}
              </select> 
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          <a onClick={this.props.onClick} className="modal-action modal-close waves-effect waves-green btn-flat">Add User</a>
        </div>
      </div>
		)
	}
}
export default AddUserModal;