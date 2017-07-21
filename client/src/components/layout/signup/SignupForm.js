import React, { Component } from 'react';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false
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
		this.setState({ errors: {}, isLoading: true });
		this.props.userSignupRequest(this.state).then(
			() => {},
			({ data }) => this.setState({ errors: data, isLoading: false })
		);
	}

    render() {
    	const { errors } = this.state;
		console.log(errors);
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
									{errors.email && <span className="help-block">{errors.email}</span>}
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input id="password" onChange={this.onChange} name="password" type="password" className="form-control" />
									<label htmlFor="password">password</label>
									{errors.password && <span className="help-block">{errors.password}</span>}
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input id="passwordConfirmation" onChange={this.onChange} name="passwordConfirmation" type="password" className="form-control" />
									<label htmlFor="passwordConfirmation">Password Confirmation</label>
								</div>
								{errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
							</div>
							<div className="row">
								<button disabled={ this.state.isLoading } className="waves-effect waves-light btn">Sign Up</button>
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