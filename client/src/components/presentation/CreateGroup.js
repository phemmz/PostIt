import React, { Component } from 'react';

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      users: {},

      groups: {},

      list: [],

      userList: []
    }
  }

  updateGroupHandler(event) {
    let updatedGroup = Object.assign({}, this.state.groups);
    updatedGroup[event.target.id] = event.target.value;
    this.setState({
      groups: updatedGroup
    })
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.updateGroupList(this.state.groups);
		this.refs.group.value = "";
  }

  addUser() {
    let updatedUserLists = Object.assign([], this.state.userList);
    updatedUserLists.push(this.state.users);
    this.setState({
      userList: updatedUserLists
    })
	}

  componentDidMount() {
    window.$('#close-modal').click(() => {
      window.$('#createGroup').modal('close');
    });
  }

    render() {
      return (
        <div id="createGroup" className="modal">
          <div className="modal-content">
            <h4 className="green-text text-darken-4">Create Broadcast Group</h4>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">group</i>
                    <input ref="group" onChange={this.updateGroupHandler.bind(this)} id="groupname" type="text" className="validate" />
                    <label htmlFor="groupname">Group name</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
            <a onClick={this.submitHandler.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat">Create Group</a>
          </div>
        </div>
      )
  }

}

export default CreateGroup;