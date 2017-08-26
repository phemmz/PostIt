import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateMessage, Message, AddUserModal, SideNav } from '../presentation';
import GroupActions from '../../actions/groupActions';
import MessageActions from '../../actions/messageActions';
import AuthenticationActions from '../../actions/authActions';

/**
 * Messages class
 */
class Messages extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      errors: {},
      selectedGroupId: this.props.selectedGroup,
      groupName: 'Welcome',
      username: ''
    };

    this.messageList = this.messageList.bind(this);
    this.groupPicked = this.groupPicked.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  /**
   * Just before the component mounts, getUsers action is fired
   * The action makes a call to the api and gets all registered users
   * @return {*} void
   */
  componentWillMount() {
    this.props.getUsers();
  }
  /**
   * @description this is called if there is change in props
   * it checks if selectedGroup of next props is different from
   * selectedGroupId of the state before calling setState
   * and updates the selectedGroupId, groupName and list
   * @param {object} nxtProps
   * @return {*} void
   */
  componentWillReceiveProps(nxtProps) {
    if (nxtProps.selectedGroup !== this.props.selectedGroup) {
      this.setState({
        errors: {}
      });
      /**
       * The groupMessages action gets fired here
       * and the groupId of the group selected is passed along
       */
      this.props.groupMessages(nxtProps.selectedGroup).then((results) => {
        const groupName = this.groupName(nxtProps.selectedGroup);
        this.setState({
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
/**
 * @description Fires the postMessage action.
 * The action sends the message object to the api
 * and then updates the state with the response
 * @param {*} message
 * @return {*} void
 */
  sendMessage(message) {
    const groupId = this.props.selectedGroup;
    this.props.sendMessage(groupId, message)
      .then((response) => {
/**
 * Makes a copy of the list array in the state
 * and then push the message response to the copied array
 * It updates the state with this updated copy
 */
        const updatedList = Object.assign([], this.state.list);
        updatedList.push(response);
        this.setState({
          list: updatedList
        });
        Materialize.toast('Message Sent', 4000, 'green');
      })
      .catch(() => {
        Materialize.toast('Message Failed', 4000, 'red');
      });
  }
/**
 * @description Fires the addUser action and pass groupId and username to it
 * on success or error, Materialize toast is called with appropriate message
 * @return {*} void
 */
  addUser() {
    const groupId = this.props.selectedGroup;
    const username = { username: this.state.username };
    this.props.addUser(groupId, username)
      .then(() => {
        Materialize.toast('User Successfully Added to Group', 4000, 'green');
      })
      .catch(() => {
        Materialize.toast('User Already Exist In The Group', 4000, 'red');
      });
  }
/**
 * Gets the value from the select dropdown and set it to state
 * @param {*} e
 * @return {*} void
 */
  updateUser(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
/**
 * Loops through the list array in the state and displays each message in the list array
 * @return {*} li
 */
  messageList() {
    return this.state.list.map(message => (
      <li key={message.id}>
        <Message
          currentMessage={message}
        />
      </li>
    ));
  }
/**
 * @description groupPicked returns an array of the group selected
 * by filtering all the groups based on the selectedGroupId
 * @param {*} selectedGroupId
 * @return {*} array
 */
  groupPicked(selectedGroupId) {
    return this.props.groupList.filter(groupObject => (groupObject.id === selectedGroupId))[0];
  }
/**
 * @description groupName returns the groupname if a group is selected and returns
 * just Welcome if no groupname is selected
 * @param {*} groupId
 * @return {*} groupname
 */
  groupName(groupId) {
    const group = groupId ? this.groupPicked(groupId) : null;
    return (group == null) ? 'Welcome' : group.groupname;
  }
  /**
   * render function
   * @return {*} void
   */
  render() {
    $('#addUser').modal();
    $('.button-collapse').sideNav();
    $('.tooltipped').tooltip({ delay: 50 });
    const appUsers = this.props.appUsers.map((users) => {
      return (
        <option key={users.id} value={users.username}>{users.username}</option>
      );
    });
    const { errors } = this.state;
    let content = null;
    if (this.props.appStatus === 'no groups') {
      content =
        (<div>
          <div className="msgscrbar">
            <h4 className="green-text text-darken-4"><strong>{this.state.groupName}</strong></h4>
            { errors.message && <div className="alert alert-danger">{errors.message}</div> }
            <p>Yo, you can create a new group</p>
          </div>
        </div>);
    } else {
      content =
      (<div>
        <SideNav
          currentUser={this.props.currentUser}
        />
        <AddUserModal
          value={this.state.username}
          onChange={this.updateUser}
          appUsers={appUsers}
          onClick={this.addUser}
        />
        <div className="msgscrbar">
          {
            (this.props.selectedGroup) ?
            (
              <div className="row">
                <div className="col s12 m12">
                  <span><h5 id="msg-header" className="green-text text-darken-4 card">
                    <strong>
                      <a
                        href=""
                        id="slide-out-nav"
                        data-activates="slide-out"
                        className="button-collapse"
                      >
                        <i
                          className="fa fa-info-circle left group-details tooltipped"
                          aria-hidden="true"
                          data-tooltip="Show Group Details"
                        />
                      </a>
                      { this.state.groupName }
                    </strong></h5>
                  </span>
                </div>
              </div>
            ) :
            (
              <div className="row">
                <div className="col s12">
                  <span><h5 id="welcome-header" className="green-text text-darken-4 card">
                    <strong>
                      { this.state.groupName }
                    </strong></h5>
                  </span>
                </div>
              </div>
            )
          }
          { errors.message && Materialize.toast(errors.message, 4000, 'red') }
          <ol style={{ listStyle: 'none' }}>
            {this.messageList()}
          </ol>
        </div>
        <CreateMessage
          onCreate={this.sendMessage}
          selectedGroup={this.props.selectedGroup}
        />
      </div>);
    }
    return content;
  }
}

const stateToProps = (state) => {
  return {
    groupList: state.groupReducer.groupList,
    groupMessages: state.messageReducer.groupMessages,
    addUser: state.groupReducer.addUser,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus,
    appUsers: state.userReducer.users,
    currentUser: state.auth.user
  };
};

const dispatchToProps = (dispatch) => {
  return {
    groupMessages: (groupId) => {
      return dispatch(MessageActions.groupMessages(groupId));
    },
    addUser: (groupId, userAdded) => {
      return dispatch(GroupActions.addUser(groupId, userAdded));
    },
    getUsers: () => {
      return dispatch(AuthenticationActions.getUsers());
    },
    sendMessage: (groupId, message) => {
      return dispatch(MessageActions.postMessage(groupId, message));
    }
  };
};
export default connect(stateToProps, dispatchToProps)(Messages);
