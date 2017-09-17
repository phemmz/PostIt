import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, GroupHeader, SearchButton, PreLoader } from '../presentation';
import GroupActions from '../../actions/groupActions';
/**
 * Groups class which inherits the React.Component class
 */
class Groups extends Component {
  /**
   * constructor
   * @returns {*} void
   */
  constructor() {
    super();
    this.state = {
      users: {},
      list: [],
      userList: [],
      selected: 0
    };
    this.setSelectedGroupId = this.setSelectedGroupId.bind(this);
  }
  /**
 * componentDidMount() is called at the instance where the Groups component is being created
 * and inserted into the DOM
 * It fires the action that gets all the groups a user belongs to
 * @return {*} void
 */
  componentDidMount() {
    /**
 * Fires the action for fetching all groups
 * a user belongs to on componentDidMount
 */
    this.props.fetchGroups();
    window.$('.modal-trigger').click((event) => {
      event.preventDefault();
      window.$('#createGroup').modal();
    });
  }
  /**
 * groupClickHandler gets called from Group component when a groupname is clicked on
 * It fires the groupSelected action
 * @param {integer} groupId
 * @return {*} void
 */
  setSelectedGroupId(groupId) {
    /**
 * calls the groupSelected action and passes the groupId of the group selected to it
 * This action saves the id to the reducer
 */
    this.props.groupSelected(groupId);
  }
  /**
   * render
   * @return {*} li
   */
  render() {
    $('.tooltipped').tooltip();
    const listItems = this.props.groupList.map((group) => {
      const selected = (group.id === Number(this.props.selectedGroup));
      return (
        <li className="each-group" key={group.id}>
          <Group
            groupPropsObj={group}
            groupClickHandler={this.setSelectedGroupId}
            isSelected={selected}
            groupId={group.id}
          />
        </li>
      );
    });

    let content = null;
    if (this.props.appStatus === 'loading') {
      content =
      (<div className="container-fluid">
        <div className="row">
          <div className="col s12 m12">
            <div className="container-fluid">
              <div className="row">
                <div className="col s12">
                  <h5 className="white-text text-darken-4">Your Group List</h5>
                </div>
              </div>
              <hr />
              <PreLoader />
            </div>
          </div>
        </div>
      </div>
      );
    } else if (this.props.appStatus === 'no groups') {
      content =
      (
        <GroupHeader
          notifications={this.props.notifications}
        >
          <div className="scrbar center">
            <h5>You currently dont belong to any group</h5>
          </div>
          <hr />
          <SearchButton />
        </GroupHeader>
      );
    } else if (this.props.appStatus === 'ready') {
      content =
        (
          <GroupHeader
            notifications={this.props.notifications}
          >
            <div className="scrbar">
              <ol className="ordered-list">
                {listItems}
              </ol>
            </div>
            <hr />
            <SearchButton />
          </GroupHeader>
        );
    }
    return content;
  }
}

Groups.propTypes = {
  appStatus: PropTypes.string.isRequired,
  selectedGroup: PropTypes.string,
  groupSelected: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    groupname: PropTypes.string
  })),
  notifications: PropTypes.arrayOf(PropTypes.string)
};

Groups.defaultProps = {
  selectedGroup: '',
  groupList: [],
  notifications: []
};

const stateToProps = (state) => {
  return {
    groupList: state.groupReducer.groupList,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus,
    notifications: state.messageReducer.notifications
  };
};

const dispatchToProps = (dispatch) => {
  return {
    fetchGroups: () => {
      return dispatch(GroupActions.fetchGroups());
    },
    groupCreate: (group) => {
      return dispatch(GroupActions.groupCreate(group));
    },
    groupSelected: (groupIndex) => {
      return dispatch(GroupActions.groupSelected(groupIndex));
    }
  };
};
export default connect(stateToProps, dispatchToProps)(Groups);
