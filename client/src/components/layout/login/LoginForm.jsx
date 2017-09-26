import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import sharedSigninValidations from
  '../../../../../server/shared/loginValidations';
import TextFieldGroup from '../../common/TextFieldGroup.jsx';
import AuthenticationActions from '../../../actions/authActions';
/**
 * @description LoginForm class
 */
class LoginForm extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };
/**
 * binds the onSubmit and onChange functions to this
 */
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

/**
 * @description onSubmit() gets called when the
 * login button is pressed, it calls isValid() to check
 * if there are no validation errors and then fires the login action
 * @param {*} event
 * @return {*} void
 */
  onSubmit(event) {
/**
 * prevents the default onSubmit action of a form tag
 */
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      /**
       * the login action is fired here
       */
      this.props.login(this.state)
        .then(() => {
          browserHistory.push('/dashboard');
          Materialize.toast('Login Successful!!', 4000, 'green');
        })
        .catch((err) => {
          Materialize.toast(err.response.data.errors.message, 4000, 'red');
          this.setState({ errors: err.response.data.errors });
        });
    }
  }
/**
 * @description onChange() gets called when the input field changes
 * and the change is stored in the state
 * @param {*} event
 * @return {*} void
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
/**
 * @description Gets the userDetails as response from google
 * @param {*} response
 * @return {*} void
 */
  responseGoogle(response) {
    const userDetails = {
      username: response.profileObj.email.substring(
        0, response.profileObj.email.indexOf('@')),
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      phoneNumber: response.profileObj.googleId
    };
    this.props.googleAuthentication(userDetails)
      .then(() => {
        browserHistory.push('/dashboard');
        Materialize.toast('Welcome!!', 4000, 'green');
      });
  }
/**
 * @description isValid() gets called on login submit
 * and sets any validation errors to the state
 * @return {*} isValid
 */
  isValid() {
    const { errors, isValid } =
      sharedSigninValidations.validateSignin(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
/**
 * render
 * @return {*} void
 */
  render() {
/**
 * deconstruct variables from state
 */
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-s7 offset-m6 login">
            <div className="right"><GoogleLogin
              clientId="484298663558-arrp0kt4u2j2aro9k2bbb2bcffth9fke.apps.googleusercontent.com" // eslint-disable-line
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              buttonText="Sign in with Google"
              className="google-link"
            />
            </div>
            <form onSubmit={this.onSubmit}>
              <h4 className="green-text text-darken-4 login-text">Login</h4>
              { errors.message &&
                <div id="uname-error" className="error">{ errors.message }</div>
              }
              <TextFieldGroup
                error={errors.username}
                id="username"
                onChange={this.onChange}
                value={this.state.username}
                field="username"
                htmlFor="username"
                label="Username"
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
              />
              <div className="center">
                <button className="waves-effect waves-light btn">Login</button>
              </div>
              <div className="center reset-link">
                <Link to="/reset">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  googleAuthentication: PropTypes.func.isRequired
};

const dispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      return dispatch(AuthenticationActions.login(data));
    },
    googleAuthentication: (userDetails) => {
      return dispatch(AuthenticationActions.googleAuthentication(userDetails));
    }
  };
};

export default connect(null, dispatchToProps)(LoginForm);
