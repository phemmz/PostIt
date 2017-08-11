import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { CreateMessage, Message, AddUserModal, SideNav } from '../presentation';
import GroupActions from '../../actions/groupActions';
import AuthenticationActions from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 * Messages class
 */
class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			errors: {},
			selectedGroupId: this.props.selectedGroup,
			groupName: 'Welcome',
			username: ''
		}

		this.messageList = this.messageList.bind(this);
		this.groupPicked = this.groupPicked.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.addUser = this.addUser.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

  handleRedirect() {
    browserHistory.push('/dashboard');
  }
	
	componentWillMount() {
    this.props.getUsers();
	}

	componentWillReceiveProps(nxtProps) {
		if(nxtProps.selectedGroup !== this.state.selectedGroupId) {
			this.groupMessages(nxtProps.selectedGroup).then((results) => {
				const groupName = this.groupName(nxtProps.selectedGroup);
				this.setState({
					errors: {},
					selectedGroupId: nxtProps.selectedGroup,
					groupName,
					list: results
				});
			}).catch((err) => {
				const groupName = this.groupName(nxtProps.selectedGroup);
				this.setState({
					groupName,
					errors: err.response.data,
					list: []
				});
      });
		}
	}

	sendMessage(message) {
		message.group = this.props.selectedGroup;
		const groupId = this.props.selectedGroup;
		axios.post(`/api/group/${groupId}/message`, message)
		  .then((response) => {
			let updatedList = Object.assign([], this.state.list);
			updatedList.push(response.data.results);
			this.setState({
				list: updatedList
			});
    });	
	}

	addUser(e) {
		const groupId = this.props.selectedGroup;
    this.props.addUser(groupId, this.state.username)
		  .then(() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'User added successfully'
				})
			})
			.catch((err) => this.setState({
				errors: err.response.data
			}))
	}
  
	updateMessage(e) {
		let updatedMessage = Object.assign({}, this.state.messages);
		updatedMessage[e.target.id] = e.target.value;
    updatedMessage['groupId'] = this.props.selectedGroup;
		this.setState({
			messages: updatedMessage
		})
	}

	updateUser(e) {
		let updatedUser = Object.assign([], this.state.userAdded);
		updatedMessage[e.target.id] = e.target.value;
		this.state.userAdded = e.target.value;
	}

	groupMessages(groupId) {
    return axios.get(`api/group/${groupId}/messages`)
      .then((response) => {
				return response.data.results;
      });
	}

	messageList() {
		return this.state.list.map((message) => (
				<li key={message.id}>
					<Message
					   currentMessage={message}
					/>
				</li>
			));
	}

	groupPicked(selectedGroupId) {
		return this.props.groupList.filter(groupObject => (groupObject.id == selectedGroupId))[0];
	}

	groupName(groupId) {
		const group = groupId ? this.groupPicked(groupId) : null;
		return (group == null) ? 'Welcome' : group.groupname;
	}

	listGroupMsgs() {
		const { selectedGroupId } = this.state;
		if(selectedGroupId && this.groupPicked(selectedGroupId)) {
			return this.groupMessages(selectedGroupId);
		} else {
			return [];
		}
	}

	componentDidMount() {
		$('.tooltipped').tooltip({delay: 50});
	}

	render() {
		$('#addUser').modal();
		$(".button-collapse").sideNav();
		$('select').material_select();
		const appUsers = this.props.appUsers.map((users, i) => {
			return (
				<option key={i} value={users.username}>{users.username}</option>
			)
		});
		const { errors } = this.state;
			let content = null;
			if (this.props.appStatus == 'no groups') {
					content =
						<div>
							<div className="msgscrbar">
								<h4 className="green-text text-darken-4"><strong><em>{this.state.groupName}</em></strong></h4>
								{ errors.message  && <div className="alert alert-danger">{errors.message}</div> }			
								<p>Yo, you can create a new group</p>
							</div>
						</div>
			} else {
				content =
				<div>
					<SideNav
					 currentUser={this.props.currentUser}
				  />
					<AddUserModal
					 value={ this.state.username }
					 onChange={ this.updateUser }
					 appUsers={ appUsers }
					 onClick={ this.addUser }
					/>
					<div className="msgscrbar">
						{
							(this.props.selectedGroup) ? 
							(
								<span><h5 className="green-text text-darken-4">
									<strong>
										<a id="slide-out-nav" data-activates="slide-out" className="button-collapse">
											<i className="small left material-icons group-details tooltipped" data-tooltip="Show Group Details">account_box</i>
										</a>
										<em>{this.state.groupName}</em>
									</strong></h5>
								</span>
							) : 
							(
								<span><h5 className="green-text text-darken-4">
									<strong>
										<em>{this.state.groupName}</em>
									</strong></h5>
								</span>
							)
						}
						{ errors.message  && <div className="alert alert-danger">{errors.message}</div> }
						<ol style={{listStyle: "none"}}>
							{this.messageList()}
						</ol>							
					</div>
						<CreateMessage onCreate={this.sendMessage}  selectedGroup={this.props.selectedGroup} />
				</div>
			}
			return content;
	}
}

const stateToProps = (state) => {
	return {
		groupList: state.groupReducer.groupList,
		groupMessages: state.groupReducer.groupMessages,
		addUser: state.groupReducer.addUser,
    selectedGroup: state.groupReducer.selectedGroup,
		appStatus: state.groupReducer.appStatus,
		appUsers: state.userReducer.users,
		currentUser: state.auth.user
	}
}

const dispatchToProps = (dispatch) => {
  return {
    groupMessages: (groupId) => dispatch(GroupActions.groupMessages(groupId)),
		addUser: (groupId, userAdded) => dispatch(GroupActions.addUser(groupId, userAdded)),
		addFlashMessage: (message) => dispatch(addFlashMessage(message)),
		getUsers: () => dispatch(AuthenticationActions.getUsers())
  }
}
export default connect(stateToProps, dispatchToProps)(Messages);