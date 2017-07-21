import React, { Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {

    render() {
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
										<ul className="right hide-on-med-and-down">
											<li><a href="#modal1" className="waves-effect waves-light btn">Login</a></li>
											<li><a href="#modal2" className="waves-effect waves-light btn">Sign Up</a></li>
										</ul>
										<ul className="side-nav" id="mobile-demo">
											<li><a href="./login.html" className="waves-effect waves-light btn">Login</a></li>
											<li><a href="./signup.html" className="waves-effect waves-light btn">Sign Up</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</header>
				<div className="row modal" id="modal2">
					<div className="modal-content">
						<div className="welc grouplist">
							<form className="col s12" action="api/user/signup" method="post">
								<div className= "row">
									<h3 className="userlogin">SIGN UP</h3>
								</div>
								<div className="row">
									<div className="input-field col s6">
										<input id="email" type="text" className="validate" />
										<label for="email">Email</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s6">
										<input id="username" type="text" className="validate" />
										<label for="username">Username</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s6">
										<input id="password" type="password" className="validate" />
										<label for="password">Password</label>
									</div>
								</div>
								<div className="row">
									<a className="waves-effect waves-light btn" href="./dashboard.html">Sign Up</a>
								</div>
								<div className="modal-footer">
									<a href="#" className="btn modal-action modal-close waves-effect waves-green btn-flat"Close></a>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="container">
				    {this.props.children}
				</div>
				<footer className="footer">			          
			          <div className="footer-copyright teal lighten-2">
			            <div className="container">
							&copy; <script type="text/javascript">document.write(new Date().getFullYear());</script> Andela, Inc
			            </div>
			          </div>
		        </footer>
			</div>
        );
    }

}

export default Main