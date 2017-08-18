import React, { Component} from 'react';
import { Link } from 'react-router';
import NavigationBar from './NavigationBar';

class Main extends Component {
    render() {
    	return (
    		<div>
				<NavigationBar />
				<div className="container-fluid">
				    {this.props.children}
				</div>
			</div>
        );
    }

}

export default Main