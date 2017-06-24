import React, { Component } from 'react';
import Groups from '../containers/Groups';
import Messages from '../containers/Messages';
import Footer from '../containers/Footer';
import Header from '../containers/Header';


class Home extends Component {

	render() {
		return (
			<div className="container" style={{marginRight: 0, marginLeft: 0, width: "100em"}}>
				<Header />	
			    <div className="row" style={{marginTop: 0}}>
			        <div className="col-md-6">
			            <Groups />
			        </div>
			        <div className="col-md-6" style={{marginTop: "-64rem", position: "absolute", marginLeft: "45rem"}}>
			            <Messages />
			        </div>        
	                <Footer />
			    </div>					
		    	
			</div>
		)
	}
}
export default Home