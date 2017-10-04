import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationActions from '../../actions/authActions';

/**
 * @description The Navigation Bar class
 */
export class NavigationBar extends Component {
  /**
   * constructor
   * @return {*} void
   */
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  /**
   * @description logout function that calls the
   * action that removes jwt token from local storage
   * @param {*} event
   * @return {*} void
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   * render
   * @return {*} void
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const authenticatedLinks = (
      <div>
        <ul className="right hide-on-med-and-down lgout">
          <li>
            <a
              href=""
              onClick={this.logout}
              className="waves-effect waves-light btn test-logout"
            >Logout</a>
          </li>
        </ul>
        <ul className="side-nav my-sidenav" id="mobile-demo">
          <li>
            <a
              onClick={this.logout}
              className="waves-effect waves-light btn"
              role="button"
              href="#!"
            >Logout</a>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="waves-effect waves-light btn"
            >Dashboard</Link></li>
          <li>
            <Link
              to="search"
              className="waves-effect waves-light btn"
            >Search For Users</Link>
          </li>
        </ul>
      </div>
    );

    const userLinks = (
      <div className="col s10">
        <ul className="right hide-on-med-and-down">
          <li>
            <Link
              to="/login"
              className="waves-effect waves-light btn"
            >Login</Link></li>
          <li>
            <Link
              to="/signup"
              className="waves-effect waves-light btn"
            >Sign Up</Link></li>
        </ul>
        <ul className="side-nav my-sidenav" id="mobile-demo">
          <li>
            <Link
              to="/login"
              className="waves-effect waves-light btn"
            >Login</Link></li>
          <li>
            <Link
              to="/signup"
              className="waves-effect waves-light btn"
            >Sign Up</Link></li>
        </ul>
      </div>
    );

    return (
      <div className="container-fluid">
        <header>
          <nav className="black navbar navbar-default">
            <div className="nav-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col s2" >
                    <Link
                      to="/dashboard"
                      className="brand-logo"
                    >
                      <img
                        className="postlogo"
                        src="https://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfaDpR5KmB...JwXs1M3EMoAJtlSAsgfNr...f4+"
                        alt="postit"
                      />
                    </Link>
                    <a
                      href=""
                      data-activates="mobile-demo"
                      className="button-collapse"
                    >
                      <i className="material-icons">menu</i>
                    </a>
                  </div>
                  { isAuthenticated ? authenticatedLinks : userLinks }
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      userId: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      iat: PropTypes.number,
      exp: PropTypes.number,
    })
  })
};

NavigationBar.defaultProps = {
  auth: PropTypes.shape({
    user: {}
  })
};

const stateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(AuthenticationActions.logout());
    }
  };
};

export default connect(stateToProps, dispatchToProps)(NavigationBar);
