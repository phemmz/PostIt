import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupActions from '../../actions/groupActions';
/**
 * @description CreateGroup container
 */
class CreateGroup extends Component {
  /**
   * constructor
   */
  constructor() {
    super();
    this.state = {
      users: {},
      groups: {},
      list: [],
      userList: []
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.updateGroupHandler = this.updateGroupHandler.bind(this);
  }
/**
 * gets the value from the input field and set it to the state
 * @param {*} event
 * @return {*} state
 */
  updateGroupHandler(event) {
    const updatedGroup = Object.assign({}, this.state.groups);
    updatedGroup[event.target.id] = event.target.value.trim();
    this.setState({
      groups: updatedGroup
    });
  }
/**
 * onSubmit, the create group button fires an action that creates a group
 * @param {*} event
 * @return {*} flashmessage
 */
  submitHandler(event) {
    event.preventDefault();
    this.props.groupCreate(this.state.groups)
      .then(() => {
        browserHistory.push('/dashboard');
        Materialize.toast('Group Created!', 4000, 'green');
      })
      .catch(() => {
        Materialize.toast('Group Already Exist!', 4000, 'red');
        this.refs.group.value = '';
      });
  }
  /**
   * render
   * @return{*} div
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 card">
            <h5 className="green-text text-darken-4">Create Broadcast Group</h5>
            <div className="row group-form">
              <form onSubmit={this.submitHandler} className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">group</i>
                    <input
                      ref="group"
                      onChange={this.updateGroupHandler}
                      id="groupname"
                      type="text"
                      className="validate"
                      required
                    />
                    <label htmlFor="groupname">Group name</label>
                  </div>
                  <div className="center">
                    <button
                      className="waves-effect waves-light btn center btn-group"
                    >Create Group</button>
                    <Link
                      to="/dashboard"
                      className="waves-effect waves-light btn center"
                    >Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  groupCreate: PropTypes.func.isRequired
};

const dispatchToProps = (dispatch) => {
  return {
    groupCreate: (group) => {
      return dispatch(GroupActions.groupCreate(group));
    }
  };
};

export default connect(null, dispatchToProps)(CreateGroup);
