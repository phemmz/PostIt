import React, { Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SignupActions from '../../actions/signupActions';
import sharedResetValidations from '../../../../server/shared/resetValidations';

/**
 * CheckVerificationPage
 */
class CheckVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      invalid: false,
      resetMessage: '',
      verificationCode: '',
      verificationStatus: false,
      password: '',
      passwordConfirmation: ''
    }
    /**
     * This binding is necessary to make `this` work in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkVerificationCode = this.checkVerificationCode.bind(this);
    this.updatePassword = this.updatePassword.bind(this)
  }
  /**
   * onChange gets called when the value of an element has been changed
   * It sets this change into the state
   * It also sets invalid to false and then empties the errors object
   * @param {*} e 
   */
  onChange(e) {
    this.setState(
      { 
        [e.target.id]: e.target.value.trim(),
        invalid: false,
        errors: {}
      }
    );
  }
  /**
   * updatePassword updates the state when there is any change
   * on the value of the input fields of password and password confirmation
   * @param {*} e 
   */
  updatePassword(e) {
    this.setState({
      [e.target.id]: e.target.value.trim()
    });
  }
  
  /**
   * isValid() does a client side validations on password and 
   * password confirmation input fields.
   */
  isValid() {
    const { errors, isValid } = sharedResetValidations.commonValidations(
      { 
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      }
    );
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * calls the action that reset the password on submit
   * it calls the validation function first before performing
   * any submit action
   * @param {*} e 
   */
  onSubmit(e) {
    /**
     * Prevents the default action of a form on submit
     */
    e.preventDefault();
    if (this.isValid()) {
      /**
       * empties the errors object if there are no validation errors
       */
      this.setState({ errors: {} });
      /**
       * Fires the updatePassword action and passes the
       * username with the new password along
       */
      this.props.updatePassword({
        username: this.state.username,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      })
        .then(() => {
          Materialize.toast('Password Reset Successfull', 4000, 'green');
          /**
           * On successfull reset of the password, it redirects to the login page
           */
          this.context.router.push('/login');
        })
        .catch(() => {
          Materialize.toast('Password Reset Failed', 4000, 'red');
        });
    }
  }
  /**
   * This is where the verification code entered by the user gets verified
   * An action is fired that checks if this verification code is the same as
   * the one generated in the api
   * @param {*} e 
   */
  checkVerificationCode(e) {
    e.preventDefault();
    const identifier = this.state.verificationCode;
    this.props.isUserExists(identifier)
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          this.setState({
            errors: { 
              verificationCode: 'Wrong verification code'
            },
            invalid: true
          });
        } else {
          this.setState({
            verificationStatus: true,
            username: response.data.user.username
          });
          Materialize.toast('Verification Code Accepted ', 4000, 'green');
        }
      })
  }

  render() {
    const { errors, resetMessage, verificationStatus } = this.state;
    let content = null;
    if ( verificationStatus ) {
      content = 
        <div className="container">
          <div className="row">
            <div className="col s8 m6 offset-s2 offset-m3 reset-form reset-height">
              <form onSubmit={this.onSubmit}>
                <h4 className="green-text text-darken-4 login-text">Enter New Password</h4>
                <TextFieldGroup 
                  error={errors.password}
                  id="password"
                  onChange={this.updatePassword}
                  value={this.state.password}
                  field="password"
                  htmlFor="password"
                  label="Password"
                  type="password"
                />
                <TextFieldGroup 
                  error={errors.passwordConfirmation}
                  id="passwordConfirmation"
                  onChange={this.updatePassword}
                  value={this.state.passwordConfirmation}
                  field="passwordConfirmation"
                  htmlFor="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                />
                <div className="center">
                  <button disabled={ this.state.invalid } className="waves-effect waves-light btn">Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    } else {
      content = 
        <div className="container">
          <div className="row">
            <div className="col s8 m6 offset-s2 offset-m3 reset-form">
              <form onSubmit={this.checkVerificationCode}>
                <h4 className="green-text text-darken-4 login-text">Enter Verification Code</h4>
                <TextFieldGroup 
                  error={errors.verificationCode}
                  id="verificationCode"
                  onChange={this.onChange}
                  value={this.state.verificationCode}
                  field="verificationCode"
                  htmlFor="verificationCode"
                  label="Verification Code"
                  type="text"
                />
                <div className="center">
                  <button disabled={ this.state.invalid } className="waves-effect waves-light btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    }
    return content;
  }
}

CheckVerificationPage.contextTypes = {
  router: PropTypes.object.isRequired
}

const dispatchToProps = (dispatch) => {
  return {
    isUserExists: (identifier) => dispatch(SignupActions.isUserExists(identifier)),
    updatePassword: (newUser) => dispatch(SignupActions.updatePassword(newUser))
  }
}

export default connect(null, dispatchToProps )(CheckVerificationPage);