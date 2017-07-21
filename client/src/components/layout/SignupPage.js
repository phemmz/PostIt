import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import SignupForm from './signup/SignupForm';

class SignupPage extends Component {
	render() {
		const { userSignupRequest } = this.props;
		return (
			<div className="container">
			    <div className="welc box" style={{height: "700px"}}>
				    <SignupForm userSignupRequest={userSignupRequest} />
			    </div>
			</div>
		)
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);