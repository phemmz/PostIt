import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import sharedSignupValidations from '../../../../../server/shared/signupvalidations';
import TextFieldGroup from '../../common/TextFieldGroup';
/**
 * SignupForm class
 */
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
    /**
     * binds onChange, onSubmit and checkUserExists functions to this
     */
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
	}
  /**
   * onChange() gets called when the input fields changes and the change is stored in the state
   */
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
  /**
   * isValid() gets called on signup submit and sets any validation errors to the state
   */
  isValid() {
    const { errors, isValid } = sharedSignupValidations.commonValidations(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * checkUserExists() gets called when a user leaves the username and email input field
   * It checks if the user already exist
   */
  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then((res) => {
        let errors = this.state.errors;
        let invalid;
        /**
         * checks if isUserExists returns an object containing that user
         */
        if (res.data.user) {
          errors[field] = 'Another user exist with this ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      })
    }
  }
  /**
   * onSubmit() gets called when the user clicks on the signup button
   */
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
      /**
       * empties the errors object if there are no validation errors
       */
      this.setState({ errors: {} });
      /**
       * calls the userSignupRequest action that has been passed down to it through props
       * from SignupPage component
       */
      this.props.userSignupRequest(this.state).then(
        (res) => [
          this.context.router.push('/dashboard'),
          Materialize.toast('Signup Successful!!, Welcome', 4000, 'green')],
        (err) => this.setState({ errors: err.response.data })
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3 signup">
          <form onSubmit={this.onSubmit}>
            <h4 className="green-text text-darken-4">Create An Account</h4>	
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
            <TextFieldGroup 
              error={errors.email}
              id="email"
              onChange={this.onChange}
              value={this.state.email}
              field="email"
              htmlFor="email"
              label="Email"
              type="email"
              checkUserExists={this.checkUserExists}
            />
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
            <TextFieldGroup 
              error={errors.passwordConfirmation}
              id="passwordConfirmation"
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              field="passwordConfirmation"
              htmlFor="passwordConfirmation"
              label="Confirm Password"
              type="password"
              checkUserExists={this.checkUserExists}
            />
            <div className="center">
              <button disabled={ this.state.isLoading || this.state.invalid } className="waves-effect waves-light btn">Sign Up</button>
            </div>	
          </form>	
        </div>
      </div>
    )	
  }
}

SignupForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired 
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm