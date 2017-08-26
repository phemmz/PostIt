import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupActions from '../../actions/signupActions';
import SignupForm from './signup/SignupForm.jsx';
import AuthenticationActions from '../../actions/authActions';
/**
 * SignupPage class
 */
class SignupPage extends Component {
  /**
   * render
   * @return {*} void
   */
  render() {
    const { userSignupRequest, isUserExists, googleAuthentication } = this.props;
    return (
      <div className="container">
        <SignupForm
          isUserExists={isUserExists}
          userSignupRequest={userSignupRequest}
          googleAuthentication={googleAuthentication}
        />
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return {
    userSignupRequest: (userData) => {
      return dispatch(SignupActions.userSignupRequest(userData));
    },
    isUserExists: (identifier) => {
      return dispatch(SignupActions.isUserExists(identifier));
    },
    googleAuthentication: (userDetails) => {
      return dispatch(AuthenticationActions.googleAuthentication(userDetails));
    }
  };
};

export default connect(null, dispatchToProps)(SignupPage);
