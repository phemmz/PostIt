import React, { Component } from 'react';
import Group from '../presentation/Group';

class Groups extends Component {
	constructor() {
		super();
		this.state = {
			initialmsg: {
				nogroup: "You currently dont belong to any group",
				create: "Create a group to send broadcast messages"
			},
			groups: {},

			list: [
				{groupname: "JULY-FELLOWS-GENERAL", id: 1},
				{groupname: "JULY-FELLOWS-RANDOM", id: 2},
				{groupname: "JULY-FELLOWS-STANDUPS", id: 3}
			]
		}
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
								<input id="groupname" type="text" className="form-control" />
								<label htmlFor="groupname">Group Name</label>
								<button className="waves-effect waves-light btn">Create Group</button>
							</div>
						</div>							
						<div className="row">
							<div className="input-field col s12">
								<input id="username" type="text" className="form-control" />
								<label htmlFor="username">Username</label>
							</div>
							<div className="input-field col s12">
								<input id="groupid" type="text" className="form-control" />
								<label htmlFor="groupid">Group Id</label>
								<button className="waves-effect waves-light btn">ADD USER</button>
							</div>
						</div>					
					</div>
				</div>
			</div>
		)
	}
}

export default Groups;