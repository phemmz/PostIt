import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CreateMessage, Message,
  AddUserModal, SideNav, MessageHeader } from '../presentation';
import GroupActions from '../../actions/groupActions';
import MessageActions from '../../actions/messageActions';
import UserActions from '../../actions/userActions';

const socket = io();

/**
 * @description Messages class
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
      errors: {},
      selectedGroupId: this.props.selectedGroup,
      chips: [],
      addUserSuccess: false,
      addUserFail: false
    };

    this.messageList = this.messageList.bind(this);
    this.groupPicked = this.groupPicked.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addUser = this.addUser.bind(this);
    this.readCheck = this.readCheck.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @description Just before the component mounts, getUsers action is fired
   * The action makes a call to the api and gets all registered users
   * @return {*} void
   */
  componentWillMount() {
    this.props.getUsers();
  }
  /**
   * @description componentDidMount
   * @return {*} void
   */
  componentDidMount() {
    socket.on('newMsg', (notification) => {
      this.props.addNotification(notification);
    });
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
    this.setState({
      errors: {},
      chips: [],
      addUserSuccess: false,
      addUserFail: false
    });
    if (nxtProps.selectedGroup !== this.props.selectedGroup) {
      /**
       * The groupMessages action gets fired here
       * and the groupId of the group selected is passed along
       */
      this.props.groupMessages(nxtProps.selectedGroup).then((results) => {
        if (results === 'No message found') {
          const groupName = this.groupName(nxtProps.selectedGroup);
          this.props.setGroupName(groupName);
          Materialize.toast('No Message Found', 3000, 'red');
        } else {
          const groupName = this.groupName(nxtProps.selectedGroup);
          this.props.setGroupName(groupName);
          this.setState({
            selectedGroupId: nxtProps.selectedGroup,
          });
        }
      });
    }
  }
  /**
   * @description This function gets called onChange of add user input field
   * Gets the value as chips from the react chips package and set it to state
   * @param {*} chips
   * @return {*} void
   */
  onChange(chips) {
    this.setState({
      errors: {},
      addUserSuccess: false,
      addUserFail: false,
      chips
    });
  }
/**
 * @description Fires the postMessage action.
 * The action sends the message object to the api
 * and then updates the state with the response
 * @param {*} message
 * @return {*} void
 */
  sendMessage(message) {
    this.setState({
      errors: {}
    });
    const groupId = this.props.selectedGroup;
    this.props.sendMessage(groupId, message)
      .then(() => {
        Materialize.toast('Message Sent', 4000, 'green');
      })
      .catch(() => {
        Materialize.toast('No Message Entered', 4000, 'red');
      });
  }
/**
 * @description Fires the addUser action and pass groupId and username to it
 * on success or error, Materialize toast is called with appropriate message
 * @return {*} void
 */
  addUser() {
    this.setState({
      errors: {},
      addUserSuccess: false,
      addUserFail: false
    });
    const groupId = this.props.selectedGroup;
    const usersAddedSuccessfully = [];
    const existingUser = [];
    this.state.chips.map((username) => {
      this.props.addUser(groupId, { username })
      .then(() => {
        usersAddedSuccessfully.push(username);
        this.setState({
          addUserSuccess: true,
          usersAddedSuccessfully
        });
      })
      .catch(() => {
        existingUser.push(username);
        this.setState({
          addUserFail: true,
          existingUser
        });
      });
      return username;
    });
    this.setState({
      chips: []
    });
  }
/**
 * @description Loops through the list array in
 * the state and displays each message in the list array
 * @return {*} li
 */
  messageList() {
    return this.props.stateMessages.map((message) => {
      return (<li onMouseLeave={this.readCheck} key={message.id}>
        <Message
          currentMessage={message}
          readList={this.props.viewList.toString()}
        />
      </li>);
    });
  }
  /**
   * @description readCheck
   * @returns {*} void
   */
  readCheck() {
    const groupId = this.props.selectedGroup;
    this.props.updateReadStatus(groupId);
    this.props.readList(groupId);
  }
/**
 * @description groupPicked returns an array of the group selected
 * by filtering all the groups based on the selectedGroupId
 * @param {*} selectedGroupId
 * @return {*} array
 */
  groupPicked(selectedGroupId) {
    return this.props.groupList.filter((groupObject) => {
      return (groupObject.id === Number(selectedGroupId));
    })[0];
  }
/**
 * @description groupName returns the groupname
 * if a group is selected and returns just Welcome if no groupname is selected
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
    const allUsers = [];
    this.props.appUsers.map((users) => {
      return allUsers.push(users.username);
    });
    const { errors } = this.state;
    let content = null;
    if (this.props.appStatus === 'no groups') {
      content =
        (<div>
          <div className="msgscrbar">
            <h4
              className="green-text text-darken-4"
            ><strong>{this.props.getGroupName}</strong></h4>
            { errors.message &&
              <div className="alert alert-danger">{errors.message}</div> }
          </div>
        </div>);
    } else {
      content =
      (<div>
        <SideNav
          currentUser={this.props.currentUser}
          groupMembers={this.groupMembers}
        />
        <AddUserModal
          onClick={this.addUser}
          users={this.state.chips}
          suggestions={allUsers}
          onChipsChange={this.onChange}
          addUserSuccess={this.state.addUserSuccess}
          addUserFail={this.state.addUserFail}
          existingUser={this.state.existingUser}
          usersAddedSuccessfully={this.state.usersAddedSuccessfully}
        />
        <div className="msgscrbar">
          {
            (this.props.selectedGroup) ?
            (
              <div className="row">
                <div className="col s12 m12">
                  <span><h5
                    id="msg-header"
                    className="green-text text-darken-4 card"
                  ><strong><a
                    href="/#!"
                    id="slide-out-nav"
                    data-activates="slide-out"
                    className="button-collapse"
                  ><i
                    className="fa fa-info-circle left group-details tooltipped"
                    aria-hidden="true"
                    data-tooltip="Show Group Details"
                  />
                  </a>
                    { this.props.getGroupName }
                  </strong></h5>
                  </span>
                </div>
              </div>
            ) :
            (
              <MessageHeader
                groupName={this.props.getGroupName}
              />
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

Messages.propTypes = {
  getUsers: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
  groupMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    groupname: PropTypes.string
  })),
  viewList: PropTypes.arrayOf(PropTypes.string),
  updateReadStatus: PropTypes.func.isRequired,
  readList: PropTypes.func.isRequired,
  appUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  })),
  appStatus: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    iat: PropTypes.number,
    exp: PropTypes.number,
  }).isRequired,
  stateMessages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    readCheck: PropTypes.bool,
    priority: PropTypes.string,
    messageCreator: PropTypes.string,
    userId: PropTypes.number,
    groupId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })),
  setGroupName: PropTypes.func.isRequired,
  getGroupName: PropTypes.string.isRequired
};

Messages.defaultProps = {
  selectedGroup: null,
  groupList: [],
  notifications: [],
  viewList: [],
  appUsers: [],
  stateMessages: []
};

const stateToProps = (state) => {
  return {
    viewList: state.messageReducer.readList,
    groupList: state.groupReducer.groupList,
    stateMessages: state.messageReducer.groupMessages,
    addUser: state.groupReducer.addUser,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus,
    appUsers: state.userReducer.users,
    currentUser: state.auth.user,
    getGroupName: state.messageReducer.groupName
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
      return dispatch(UserActions.getUsers());
    },
    sendMessage: (groupId, message) => {
      return dispatch(MessageActions.postMessage(groupId, message));
    },
    addNotification: (notification) => {
      return dispatch(MessageActions.addNotification(notification));
    },
    updateReadStatus: (groupId) => {
      return dispatch(MessageActions.updateReadStatus(groupId));
    },
    readList: (groupId) => {
      return dispatch(MessageActions.readList(groupId));
    },
    setGroupName: (groupName) => {
      return dispatch(MessageActions.setGroupName(groupName));
    }
  };
};
export default connect(stateToProps, dispatchToProps)(Messages);
