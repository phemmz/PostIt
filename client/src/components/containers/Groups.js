import React, { Component } from 'react';
import Group from '../presentation/Group';
import superagent from 'superagent';

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
		console.log("Hello from comp");
		superagent
		.get('/api/group')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err) {
				alert('Error: ' +err);
				return
			}
			console.log(JSON.stringify(response.body));
			let results = response.body.results;
			this.setState({
				list: results 
			});
		})
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
		let updatedList = Object.assign([], this.state.list);
		updatedList.push(this.state.groups);
		this.setState({
			list: updatedList
		})
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
			<div className="welc box">
				<div className="welc grouplist">
					<h4 className="green-text text-darken-4">Your Group List</h4>					
					<ol>
						{listItems}
					</ol>							
				</div>
				<div className="welc groupform">
					<h4 className="green-text text-darken-4 glist">Create Broadcast Group</h4>					
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
							</div>
							<div className="input-field col s12">
								<input onChange={this.updateUser.bind(this)} id="groupId" type="text" className="form-control" />
								<label htmlFor="groupId">Group Id</label>
								<button onClick={this.addUser.bind(this)} className="waves-effect waves-light btn">ADD USER</button>
							</div>
						</div>					
					</div>
				</div>
			</div>
		)
	}
}

export default Groups;