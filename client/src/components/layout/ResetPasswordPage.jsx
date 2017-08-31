import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import SignupActions from '../../actions/signupActions';
import AuthenticationActions from '../../actions/authActions';
/**
 * ResetPasswordPage class
 */
class ResetPasswordPage extends Component {
  /**
   * constructor
   * @params {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      errors: {},
      invalid: false,
      resetMessage: '',
      isLoading: false
    };
    /**
     * This binding is necessary to make `this` work in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * onChange gets called when the value of an element has been changed
   * It sets this change into the state
   * @param {*} e
   * @return {*} void
   */
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value.trim() });
  }

  /**
   * onSubmit calls the resetPassword action which sends a mail to the
   * user's email containing verification code and reset link
   * @param {*} e
   * @return {*} void
   */
  onSubmit(e) {
    /**
     * Prevents the default action of a form on submit
     */
    e.preventDefault();
    /**
     * empties the errors object in the state
     * and also set isLoading to true
     */
    this.setState({ errors: {}, isLoading: true });
    const username = { username: this.state.username };
    this.props.resetPassword(username)
      .then((response) => {
        this.setState({
          isLoading: false,
          resetMessage: response,
          invalid: true
        });
        Materialize.toast('Message Sent to Email', 4000, 'green');
      })
      .catch(() => {
        Materialize.toast('Failed to send reset password link to mail, Try again!', 4000, 'green');
      });
  }
  /**
   * checkUserExists() checks if the username provided exist in the database
   * It fires the isUserExists action that makes a call to the api to check if the user exist
   * If the call returns an instance of the user, then it empties the errors object
   * in the state
   * if not, it returns the message `Username not found`
   * @param {*} e
   * @return {*} void
   */
  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then((res) => {
        const errors = this.state.errors;
        let invalid;
        /**
         * checks if isUserExists returns an object containing that user
         */
        if (res.data.user) {
          errors[field] = '';
          invalid = false;
        } else {
          errors[field] = 'Username not found';
          invalid = true;
        }
        this.setState({ errors, invalid });
      });
    }
  }
  /**
   * render
   * @return {*} void
   */
  render() {
    const { errors, resetMessage } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 reset-form">
            <form onSubmit={this.onSubmit} >
              <h4 className="green-text text-darken-4 login-text">Forgot Your Password?</h4>
              { resetMessage && <div className="card col s10 m4 reset-msg">{ resetMessage }</div> }
              <TextFieldGroup
                error={errors.username}
                id="username"
                onChange={this.onChange}
                value={this.state.username}
                field="username"
                htmlFor="username"
                label="Username"
                type="text"
                checkUserExists={this.checkUserExists}
              />
              <div className="center">
                <button
                  disabled={this.state.isLoading || this.state.invalid}
                  className="waves-effect waves-light btn"
                >Reset Password</button>
              </div>
              { this.state.isLoading &&
                <div className="center">
                  <h6>Sending Verification Code to Email...</h6>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return {
    isUserExists: (identifier) => {
      return dispatch(SignupActions.isUserExists(identifier));
    },
    resetPassword: (username) => {
      return dispatch(AuthenticationActions.resetPassword(username));
    }
  };
};

export default connect(null, dispatchToProps)(ResetPasswordPage);
