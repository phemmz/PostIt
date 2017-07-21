import React, { Component } from 'react';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {}
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
		this.setState({ errors: {} });
		this.props.userSignupRequest(this.state).then(
			() => {},
			(err) => this.setState({ errors: err.response.data})
		)
	}

    render() {
    	const { errors } = this.state;
    	return (
		    <div className="row">
				<div className="col m8 col m offset4">
					<form onSubmit={this.onSubmit}>
						<h4 className="green-text text-darken-4 glist">Create An Account</h4>	
						<div className="container">
							<div className="row">							
								<div className="input-field col s12">
									<input
									id="username"
									onChange={this.onChange}
									value={this.state.username} 
									name="username" 
									type="text" 
									className="form-control" />
									<label htmlFor="username">Username</label>
									{errors.username && <span className="help-block">{errors.username}</span>}
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
			</div>
		)	
    }
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm