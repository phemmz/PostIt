import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists  } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SignupForm from './signup/SignupForm';

class SignupPage extends Component {
	render() {
		const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
		return (
			<div className="container">
			    <div className="welc box" style={{height: "700px"}}>
				    <SignupForm
					  isUserExists={isUserExists}
					  userSignupRequest={userSignupRequest}
					  addFlashMessage={addFlashMessage} />
			    </div>
			</div>
		)
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	isUserExists: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);