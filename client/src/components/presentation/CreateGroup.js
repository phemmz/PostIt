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

  updateGroup(event) {
      console.log('Groupname: '+event.target.value);
  let updatedGroup = Object.assign({}, this.state.groups);
  updatedGroup[event.target.id] = event.target.value;
  this.setState({
    groups: updatedGroup
  })
  }

  createGroup() {
    console.log('creaste group: '+ JSON.stringify(this.state.groups));
    this.props.onCreate(this.state.groups);
  }

  addUser() {
    let updatedUserLists = Object.assign([], this.state.userList);
    updatedUserLists.push(this.state.users);
    this.setState({
      userList: updatedUserLists
    })
    console.log(JSON.stringify(this.state.userList));
	}

    render() {
        return (
            <div>
                <h4 className="left green-text text-darken-4">Create Broadcast Group</h4>					
                <div className="container">
                    <div className="row">							
                        <div className="input-field col s12">
                            <input onChange={this.updateGroup.bind(this)} id="groupname" type="text" className="form-control" />
                            <script></script>
                            <label htmlFor="groupname">Group Name</label>
                            <button onClick={this.createGroup.bind(this)} className="waves-effect waves-light btn">Create Group</button>
                        </div>
                    </div>							
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.updateGroup.bind(this)} id="username" type="text" className="form-control" />
                            <label htmlFor="username">Username</label>
                            <button onClick={this.addUser.bind(this)} className="waves-effect waves-light btn">ADD USER</button>
                        </div>
                    </div>					
                </div>
            </div>
        )
  }

}

export default CreateGroup;