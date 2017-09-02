import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import MessageActions from '../../actions/messageActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';

/**
 * @class SearchPage
 */
class SearchPage extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };
    this.searchHandler = this.searchHandler.bind(this);
  }
  /**
   * searchHandler
   * @param {*} event
   * @return {*} void
   */
  searchHandler(event) {
    event.preventDefault();
    if (event.target.value !== '') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => {
        this.props.searchUser(this.state.searchKey);
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }
    /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const searched = this.props.searchedUsers.map((user, index) => {
      return (
        <li className="each-group" key={index}>
          {user.username}
        </li>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 card custom">
            <h5 className="green-text text-darken-4">Search For Users</h5>
            <TextFieldGroup
              id="search"
              field="searchKey"
              value={this.state.searchKey}
              htmlFor="search"
              label="Search For Users"
              onChange={this.searchHandler}
            />
            {
              (this.props.searchedUsers) ?
              (searched) :
              (<div />)
            }
            <div className="row group-form">
              <div className="center">
                <Link
                  to="/dashboard"
                  className="waves-effect waves-light btn center"
                >Go Back To Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    notifications: state.messageReducer.notifications,
    searchedUsers: state.messageReducer.searchedUsers
  };
};

const dispatchToProps = (dispatch) => {
  return {
    searchUser: (searchKey) => {
      return dispatch(MessageActions.searchUser(searchKey));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(SearchPage);
