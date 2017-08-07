import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { CreateMessage, Message } from '../presentation';
import GroupActions from '../../actions/groupActions';
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
			username: []
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
		console.log(e.target.id, 'we re ea na')
		updatedMessage[e.target.id] = e.target.value;
		
		this.state.userAdded = e.target.value;
		console.log(this.state, 'we re ea')
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
		$(".button-collapse").sideNav();
		$('.tooltipped').tooltip({delay: 50});
	}

	render() {
		$('#addUser').modal();
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
					<ul id="slide-out" className="side-nav" >
						<li className="li-hover">
							<div className="user-view">
								<div className="background">
								</div>
							</div>
						</li>
						<li><a href="#!" className="waves-effect waves-light btn">Group Members</a></li>
						<li><a href="#addUser" className="waves-effect waves-light btn modal-trigger">Add User</a></li>
					</ul>
					<div id="addUser" className="modal">
						<div className="modal-content">
							<h4 className="green-text text-darken-4">Add User to a Group</h4>
							<div className="row">
								<div className="input-field col s12">
									<select multiple id="username" value={this.state.username} onChange={this.updateUser}>
										<option value="" disabled>Choose an option</option>
										<option value="Amb">Amb</option>
										<option value="Phemmz">Phemmz</option>
										<option value="Convict">Convict</option>
									</select>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
							<a onClick={this.addUser} className="modal-action modal-close waves-effect waves-green btn-flat">Add User</a>
						</div>
					</div>
					<div className="msgscrbar">
						<span><h5 className="green-text text-darken-4">
							<strong>
								<a id="slide-out-nav" href="#" data-activates="slide-out" className="button-collapse">
									<i className="small left material-icons group-details tooltipped" data-tooltip="Show Group Details">account_box</i>
								</a>
								<em>{this.state.groupName}</em>
							</strong></h5></span>
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
    appStatus: state.groupReducer.appStatus
	}
}

const dispatchToProps = (dispatch) => {
  return {
    groupMessages: (groupId) => dispatch(GroupActions.groupMessages(groupId)),
		addUser: (groupId, userAdded) => dispatch(GroupActions.addUser(groupId, userAdded)),
		addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}
export default connect(stateToProps, dispatchToProps)(Messages);