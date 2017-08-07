import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupActions from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SignupForm from './signup/SignupForm';
/**
 * SignupPage class
 */
class SignupPage extends Component {
	render() {
		const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
		return (
			<div className="container">
				<SignupForm
					isUserExists={isUserExists}
					userSignupRequest={userSignupRequest}
					addFlashMessage={addFlashMessage} 
				/>
			</div>
		)
	}
}

const dispatchToProps = (dispatch) => {
  return {
    userSignupRequest: (userData) => dispatch(SignupActions.userSignupRequest(userData)),
    isUserExists: (identifier) => dispatch(SignupActions.isUserExists(identifier)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(null, dispatchToProps )(SignupPage);