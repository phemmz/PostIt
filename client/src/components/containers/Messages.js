import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { CreateMessage, Message } from '../presentation';
import { groupMessages } from '../../actions/groupActions';

class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			errors: {},
			selectedGroupId: this.props.selectedGroup,
			groupName: 'Welcome'
		}

		this.messageList = this.messageList.bind(this);
		this.groupPicked = this.groupPicked.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
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
    console.log('hashiash8ahs'+JSON.stringify(message));
		message.group = this.props.selectedGroup;
		const groupId = this.props.selectedGroup;
    console.log(groupId, ' ds s groupId');
		axios.post(`/api/group/${groupId}/message`, message)
		  .then((response) => {
			let updatedList = Object.assign([], this.state.list);
			updatedList.push(response.data.results);
			this.setState({
				list: updatedList
			});
    });	
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

	render() {
		const { errors } = this.state;

		return(
			<div>
				<div>
				{ errors.message  && <div className="alert alert-danger">{errors.message}</div> }
					<h4 className="green-text text-darken-4"><strong><em>{this.state.groupName}</em></strong></h4>	
					<ol style={{listStyle: "none"}}>
						{this.messageList()}
					</ol>							
				</div>
        <CreateMessage onCreate={this.sendMessage} />
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		groupList: state.groupReducer.groupList,
		groupMessages: state.groupReducer.groupMessages,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus
	}
}

const dispatchToProps = (dispatch) => {
  return {
    groupMessages: (groupId) => dispatch(groupMessages(groupId))
  }
}
export default connect(stateToProps, dispatchToProps)(Messages);