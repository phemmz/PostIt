import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sharedSigninValidations from '../../../../../server/shared/loginValidations';
import TextFieldGroup from '../../common/TextFieldGroup';
import AuthenticationActions from '../../../actions/authActions';
/**
 * LoginForm class
 */
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }
/**
 * binds the onSubmit and onChange functions to this
 */
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
/**
 * isValid() gets called on login submit and sets any validation errors to the state
 */
    isValid() {
        const { errors, isValid } = sharedSigninValidations.validateSignin(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid; 
    }
/**
 * onSubmit() gets called when the login button is pressed, it calls isValid() to check
 * if there are no validation errors and then fires the login action
 */
    onSubmit(e) {
/**
 * prevents the default onSubmit action of a form tag
 */
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {} });
            // the login action is fired here
            this.props.login(this.state).then(
                (res) => [
                    this.context.router.push('/dashboard'),
                    Materialize.toast('Login Successful!!', 4000, 'green')],
                (err) => this.setState({ errors: err.response.data.errors}),
            );
        }
    }
/**
 * onChange() gets called when the input field changes and the change is stored in the state
 */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

	render() {
/**
 * deconstruct variables from state
 */
    	const { errors, username, password, isLoading } = this.state;
    	return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m6 login">
                        <form onSubmit={this.onSubmit}>
                            <h4 className="green-text text-darken-4 login-text">Login</h4>	
                            {/* renders error messages if there are error messages */}
                            { errors.message  && <div id="uname-error" className="error">{errors.message}</div> }
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
                            <div className="center">
                                <button className="waves-effect waves-light btn">Login</button>
                            </div>
                        </form>	
                    </div>
                </div>
            </div>
		)	
    }
}


const dispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(AuthenticationActions.login(data))
  }
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, dispatchToProps)(LoginForm);