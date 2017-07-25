import React, { Component} from 'react';
import { Link } from 'react-router';
import FlashMessagesList from './flash/FlashMessagesList';
import NavigationBar from './NavigationBar';

class Main extends Component {
    render() {
    	return (
    		<div>
				<NavigationBar />
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