import React, { Component } from 'react';
import Groups from '../containers/Groups';
import Messages from '../containers/Messages';
import Footer from '../containers/Footer';
import Header from '../containers/Header';


class Home extends Component {

	render() {
		return (
			<div>					
		    	<Header />			        
		        <Groups />
	            <Messages />
     	        <Footer />
			</div>
		)
	}
}
export default Home