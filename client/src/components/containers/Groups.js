import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { CreateGroup, Group  } from '../presentation';
import { APIManager } from '../../utils';
import TextFieldGroup from '../common/TextFieldGroup';
import { fetchGroups, groupCreate, groupSelected, groupsReceived } from '../../actions/groupActions';

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
    this.props.fetchGroups(null);
		// axios.get('api/group')
    //   .then((response) => {
		// 	this.setState({
		// 		list: response.data.results
		// 	});
		// })
    // .catch((err) => {
    //   alert('ERROR: ' + err.message)
    // });
	}

  updateGroupList(group) {
    axios.post('/api/group', group)
		  .then((response) => {
        const group = response.data.result;
        this.props.groupCreate(group);
      })
			.catch((err) => {
        alert('ERROR: ' + err.message)
			});
  }

  groupClickHandler(groupId) {
    this.props.groupSelected(groupId);
  }

	// createGroup(group) {
		// let  updatedGroup = Object.assign({}, this.state.groups);
		// axios.post('/api/group', group)
		//   .then((response) => {
    //     console.log('Group CREATED: '+JSON.stringify(response.data.result));
    //     let updatedList = Object.assign([], this.state.list);
    //     updatedList.push(response.data.result);
    //     this.setState({
    //       list: updatedList
    //     });
    //   })
		// 	.catch(err => {
    //     alert('ERROR: ' + err.message)
		// 	});
	// }

	addUser() {
		let updatedUserLists = Object.assign([], this.state.userList);
		updatedUserLists.push(this.state.users);
		this.setState({
			userList: updatedUserLists
		})
		console.log(JSON.stringify(this.state.userList));
	}

  // selectGroup(index) {
  //   console.log('hellloaknjasjjdsa: '+index);
  //   this.setState({
  //     selected: index
  //   });
  // }

	render() {
		const listItems = this.props.groupList.map((group, i) => {
      let selected = (group.id == this.props.selectedGroup);
			return (
				<li key={group.id}>
          <Group groupPropsObj={ group }
                 groupClickHandler={this.groupClickHandler.bind(this) } 
                 isSelected={ selected } 
                 groupId={ group.id }
          />
        </li>
			)
		});	

    let content = null;
    if (this.props.appStatus == 'loading') {
      content = <h3>LOADING...</h3>
    } else if (this.props.appStatus == 'ready') {
      content = 
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
							<CreateGroup updateGroupList={this.updateGroupList.bind(this)} />
						</div>
					</div>
				</div>
			</div>
    }
		return content;
	}
}

const stateToProps = (state) => {
  return {
    groupList: state.groupReducer.groupList,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchGroups: (params) => dispatch(fetchGroups(params)),
    groupCreate: (group) => dispatch(groupCreate(group)),
    groupSelected: (groupIndex) => dispatch(groupSelected(groupIndex))
  }
}
export default connect(stateToProps, dispatchToProps)(Groups);