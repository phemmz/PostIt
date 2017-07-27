import React, { Component } from 'react';
import axios from 'axios';
import Group from '../presentation/Group';
import { APIManager } from '../../utils';
import TextFieldGroup from '../common/TextFieldGroup';

class Groups extends Component {
	constructor() {
		super();
		this.state = {
			users: {},

			groups: {},

			list: [],

			userList: []
		}

	}

	componentDidMount() {
		axios.get('api/group')
      .then((response) => {
			this.setState({
				list: response.data.results
			});
		})
    .catch((err) => {
      alert('ERROR: ' + err.message)
    });
	}

	updateGroup(event) {	
		console.log('Groupname: '+event.target.value);
		let updatedGroup = Object.assign({}, this.state.groups);
		updatedGroup['groupname'] = event.target.value;
		this.setState({
			groups: updatedGroup
		})
	}

	updateUser(event) {
		console.log('Username: '+event.target.id + ' == ' + event.target.value);
		let updatedUser = Object.assign({}, this.state.users);
		updatedUser[event.target.id] = event.target.value;
		this.setState({
			users: updatedUser
		})
		console.log(JSON.stringify(this.state.user));
		
	}

	createGroup() {
		let updatedGroup = Object.assign({}, this.state.groups);
		axios.post('/api/group', updatedGroup)
		  .then((response) => {
        console.log('Group CREATED: '+JSON.stringify(response.data.result));
        let updatedList = Object.assign([], this.state.list);
        updatedList.push(response.data.result);
        this.setState({
          list: updatedList
        });
      })
			.catch(err => {
        alert('ERROR: ' + err.message)
			});
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
		const listItems = this.state.list.map((group, i) => {
			return (
				<li key={i}><Group currentGroup={group}/></li>
			)
		});		
		return (
			
			<div className="container-fluid">
				<div className="row" style={{marginBottom: 0}}>
					<div className="col s2" style={{paddingLeft: 0}}>
						<h4 className="left green-text text-darken-4">Your Group List</h4>	
						<div  className="left green-text text-darken-4">
						<ol>
							{listItems}
						</ol>
						</div>
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
										<input onChange={this.updateUser.bind(this)} id="username" type="text" className="form-control" />
										<label htmlFor="username">Username</label>
                    <button onClick={this.addUser.bind(this)} className="waves-effect waves-light btn">ADD USER</button>
									</div>
								</div>					
							</div>
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}

export default Groups;