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
				<div className="container-fluid">
				    {this.props.children}
				</div>
				<footer className="black footer">			          
			          <div className="ffooter footer-copyright">
			            <div className="container">
							&copy; <script type="text/javascript">document.write(new Date().getFullYear());</script> Adetunji Femi
			            </div>
			          </div>
		        </footer>
			</div>
        );
    }

}

export default Main