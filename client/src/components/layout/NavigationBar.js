import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class NavigationBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="right hide-on-med-and-down">
        <li><a href="#" onClick={this.logout.bind(this)} className="waves-effect waves-light btn">Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/login" className="waves-effect waves-light btn">Login</Link></li>
          <li><Link to="/signup" className="waves-effect waves-light btn">Sign Up</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><a href="./login.html" className="waves-effect waves-light btn">Login</a></li>
          <li><a href="./signup.html" className="waves-effect waves-light btn">Sign Up</a></li>
        </ul>
      </div>
    );

    return (
      <div>
        <header>
					<nav className="black navbar navbar-default" role="navigation">
						<div className="nav-wrapper">
							<div className="container-fluid">
								<div className="row">
									<div className="col s2" >
										<Link to="/dashboard" className="brand-logo"><img className="postlogo" src="POSTIT.png" alt="postit logo" /></Link>
										<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
									</div>
									<div className="col s10">
										{ isAuthenticated ? userLinks : guestLinks }
									</div>
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
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
