import React, { Component } from 'react';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.userSignupRequest(this.state);
	}

    render() {
    	return (
		    <div className="welc groupform" style={{height: "600px"}}>
		        <form onSubmit={this.onSubmit}>
					<h4 className="green-text text-darken-4 glist">Create An Account</h4>	
					<div className="container">
						<div className="row">							
							<div className="input-field col s12">
								<input id="username" onChange={this.onChange} value={this.state.username} name="username" type="text" className="form-control" />
								<label htmlFor="username">Username</label>
							</div>
						</div>							
						<div className="row">
							<div className="input-field col s12">
								<input id="email" onChange={this.onChange} name="email" type="text" className="form-control" />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="password" onChange={this.onChange} name="password" type="password" className="form-control" />
								<label htmlFor="password">password</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="passwordConfirmation" onChange={this.onChange} name="passwordConfirmation" type="password" className="form-control" />
								<label htmlFor="passwordConfirmation">Password Confirmation</label>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Sign Up</button>
	                    </div>	
					</div>				
				</form>	
			</div>
		)	
    }
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm