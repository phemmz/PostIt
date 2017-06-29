import React, { Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {

    render() {
    	return (
    		<div>
	    		<nav>
				    <div className="nav-wrapper teal lighten-2">
					        <Link to="/dashboard" ><em className="post">POSTIT</em></Link>
					        <ul id="nav-mobile" className="right hide-on-med-and-down">
						        <li><Link to="/login" className="waves-effect waves-light btn">Login</Link></li>
						        <li><Link to="/signup"  className="waves-effect waves-light btn">Signup</Link></li>
					        </ul>
				    </div>
				</nav>
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
        )
    }

}

export default Main