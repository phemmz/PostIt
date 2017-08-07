import React, { Component } from 'react';
import LoginForm from './login/LoginForm';

class LoginPage extends Component {
	render() {
		return (
			<div className="row">
				<div className="col s6 m9">
					<LoginForm />
				</div>
			</div>
		)
	}
}

export default LoginPage