import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupActions from '../../actions/signupActions';
import SignupForm from './signup/SignupForm';
import AuthenticationActions from '../../actions/authActions';
/**
 * SignupPage class
 */
class SignupPage extends Component {
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
		)
	}
}

const dispatchToProps = (dispatch) => {
  return {
    userSignupRequest: (userData) => dispatch(SignupActions.userSignupRequest(userData)),
		isUserExists: (identifier) => dispatch(SignupActions.isUserExists(identifier)),
		googleAuthentication: (userDetails) => dispatch(AuthenticationActions.googleAuthentication(userDetails))
  }
}

export default connect(null, dispatchToProps )(SignupPage);