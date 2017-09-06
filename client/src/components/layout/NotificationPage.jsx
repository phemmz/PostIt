import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import MessageActions from '../../actions/messageActions';

/**
 * NotificationPage
 */
class NotificationPage extends Component {
  /**
   * constructor
   * @return {*} void
   */
  constructor() {
    super();
    this.clearNotification = this.clearNotification.bind(this);
  }
  /**
   * clearNotification
   * @return {*} void
   */
  clearNotification() {
    this.props.clearNotification();
    Materialize.toast('Notifications cleared!!', 4000, 'green');
  }
    /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allNotifications = this.props.notifications.map((notification, index) => {
      return (
        <li className="each-notification" key={index}>
          {notification}
        </li>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 card custom">
            <h5 className="green-text text-darken-4">Notifications</h5>
            <hr />
            <ul>
              {allNotifications}
            </ul>
            <div className="row group-form">
              <div className="center">
                <button
                  className="waves-effect waves-light btn center mark-btn"
                  onClick={this.clearNotification}
                >Clear Notifications</button>
                <Link
                  to="/dashboard"
                  className="waves-effect waves-light btn center"
                >Dashboard</Link>
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
    notifications: state.messageReducer.notifications
  };
};

const dispatchToProps = (dispatch) => {
  return {
    clearNotification: () => {
      return dispatch(MessageActions.clearNotification());
    }
  };
};

export default connect(stateToProps, dispatchToProps)(NotificationPage);
