import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupActions from '../../actions/signupActions';
import SignupForm from '../layout/signup/SignupForm.jsx';
import AuthenticationActions from '../../actions/authActions';

/**
 * SignupPage class
 * @return {*} component
 */
const SignupPage = ({
  userSignupRequest, isUserExists, googleAuthentication
}) => {
  return (
    <div className="container">
      <SignupForm
        userSignupRequest={userSignupRequest}
        isUserExists={isUserExists}
        googleAuthentication={googleAuthentication}
      />
    </div>
  );
};

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
  googleAuthentication: PropTypes.func.isRequired,
};

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
