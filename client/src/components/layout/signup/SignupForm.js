import React, { Component } from 'react';
import classnames from 'classnames';
import sharedSignupValidations from '../../../../../server/shared/signupvalidations';
import TextFieldGroup from '../../common/TextFieldGroup';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
      invalid: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
  
  isValid() {
    const { errors, isValid } = sharedSignupValidations.commonValidations(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignupRequest(this.state).then(
        () => {
			this.props.addFlashMessage({
				type: 'success',
        text: 'You signed up successfully, Welcome!'
			});
      this.context.router.push('/');
		},
        ({ data }) => this.setState({ errors: data })
      );
		}
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
                <TextFieldGroup 
                  error={errors.username}
                  id="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  field="username"
                  htmlFor="username"
                  label="Username"
                  checkUserExists={this.checkUserExists}
                />
							</div>							
							<div className="row">
                <TextFieldGroup 
                  error={errors.email}
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  field="email"
                  htmlFor="email"
                  label="Email"
                  checkUserExists={this.checkUserExists}
                />
							</div>
							<div className="row">
                <TextFieldGroup 
                  error={errors.password}
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  field="password"
                  htmlFor="password"
                  label="Password"
                  type="password"
                  checkUserExists={this.checkUserExists}
                />
							</div>
							<div className="row">
                <TextFieldGroup 
                  error={errors.passwordConfirmation}
                  id="passwordConfirmation"
                  onChange={this.onChange}
                  value={this.state.passwordConfirmation}
                  field="passwordConfirmation"
                  htmlFor="passwordConfirmation"
                  label="PasswordConfirmation"
                  type="password"
                  checkUserExists={this.checkUserExists}
                />
							</div>
							<div className="row">
								<button disabled={ this.state.isLoading || this.state.invalid } className="waves-effect waves-light btn">Sign Up</button>
							</div>	
						</div>				
					</form>	
				</div>
			</div>
		)	
    }
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired 
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm