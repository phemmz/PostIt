import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SignupForm from './signup/SignupForm';

class SignupPage extends Component {
	render() {
		const { userSignupRequest, addFlashMessage } = this.props;
		return (
			<div className="container">
			    <div className="welc box" style={{height: "700px"}}>
				    <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
			    </div>
			</div>
		)
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);