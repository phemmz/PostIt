import React, { Component } from 'react';
import axios from 'axios';
import { CreateGroup, Group  } from '../presentation';
import { APIManager } from '../../utils';
import TextFieldGroup from '../common/TextFieldGroup';

class Groups extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
			list: [],
			userList: [],
      selected: 0
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

	createGroup(group) {
		// let  updatedGroup = Object.assign({}, this.state.groups);
		axios.post('/api/group', group)
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

  selectGroup(index) {
    console.log('hellloaknjasjjdsa: '+index);
    this.setState({
      selected: index
    });
  }

	render() {
		const listItems = this.state.list.map((group, i) => {
      let selected = (i == this.state.selected)
			return (
				<li key={i}><Group index={i} select={this.selectGroup.bind(this)} isSelected={selected} currentGroup={group}/></li>
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
							<CreateGroup onCreate={this.createGroup.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}

export default Groups;