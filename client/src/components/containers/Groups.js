import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import { CreateGroup, Group  } from '../presentation';
import TextFieldGroup from '../common/TextFieldGroup';
import GroupActions from '../../actions/groupActions';
/**
 * Groups class which inherits the React.Component class
 */
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
  /**
	 * componentDidMount() is called at the instance where the Groups component is being created
	 * and inserted into the DOM
	 * It fires the action that gets all the groups a user belongs to
	 */
	componentDidMount() {
    this.props.fetchGroups(null);
		window.$('.modal-trigger').click((e) => {
			e.preventDefault();
			window.$('#createGroup').modal();
		});
		window.$('.tooltipped').tooltip({delay: 50});
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
  /**
	 * groupClickHandler gets called from Group component when a groupname is clicked on
	 * It fires the groupSelected action
	 */
  groupClickHandler(groupId) {
		// calls the groupSelected action and passes the groupId selected to it
    this.props.groupSelected(groupId);
  }
  /**
	 * 
	 */
	addUser() {
		let updatedUserLists = Object.assign([], this.state.userList);
		updatedUserLists.push(this.state.users);
		this.setState({
			userList: updatedUserLists
		})
	}

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
      content =
			<div className="container-fluid">
				<div className="row" style={{marginBottom: 0}}>
					<div className="col s12 m12" style={{paddingLeft: 0}}>
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List
										<a href='#createGroup' className="modal-trigger tooltipped">
											<i className="small material-icons">add_to_photos</i>
										</a>	
									</h5>
								</div>		
							</div>
							<hr />
							<div className="scrbar center">
								<h3>LOADING...</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
    } else if (this.props.appStatus == 'no groups') {
      content = 
			<div className="container-fluid">
				<div className="row" style={{marginBottom: 0}}>
					<div className="col s12 m12" style={{paddingLeft: 0}}>
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List
										<a href='#createGroup' className="modal-trigger tooltipped" data-tooltip="Create Group">
											<i className="small material-icons add-group">add_to_photos</i>
										</a>	
									</h5>
								</div>		
							</div>
							<hr />
							<div className="scrbar center">
								<h4>You currently don't belong to any group</h4>
							</div>
							<div>
								<CreateGroup updateGroupList={this.updateGroupList.bind(this)} />
							</div>
						</div>
						<div className="center">
							<Link to="" className="searchbtn waves-effect waves-light btn center">Search for users</Link>
						</div>
					</div>
				</div>
			</div>
		} else if (this.props.appStatus == 'ready') {
      content = 
      <div className="container-fluid">
				<div className="row">
					<div className="col s12 m12">
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List
										<a href="#createGroup" className="modal-trigger tooltipped" data-tooltip="Create Group">
											<i className="small material-icons add-group">add_to_photos</i>
										</a>	
									</h5>
								</div>		
							</div>
							<hr />
							<div className="scrbar center">
								<ol>
									{listItems}
								</ol>
							</div>
								<CreateGroup updateGroupList={this.updateGroupList.bind(this)} />
						</div>
						<div className="center">
							<Link to="" className="searchbtn waves-effect waves-light btn center">Search for users</Link>
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
    fetchGroups: (params) => dispatch(GroupActions.fetchGroups(params)),
    groupCreate: (group) => dispatch(GroupActions.groupCreate(group)),
    groupSelected: (groupIndex) => dispatch(GroupActions.groupSelected(groupIndex))
  }
}
export default connect(stateToProps, dispatchToProps)(Groups);