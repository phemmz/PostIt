import React, { Component} from 'react';
import { Link } from 'react-router';
import FlashMessagesList from './flash/FlashMessagesList';

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
											<li><Link to="/login" className="waves-effect waves-light btn">Login</Link></li>
											<li><Link to="/signup" className="waves-effect waves-light btn">Sign Up</Link></li>
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
				<FlashMessagesList />
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