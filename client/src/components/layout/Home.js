import React, { Component } from 'react';
import Groups from '../containers/Groups';
import Messages from '../containers/Messages;'

class Home extends Component {

	render() {
		return (
			<div className="container">
			    <div className="row">
			        <div className="col-md-6">
			            <Groups />
			        </div>
			        <div className="col-md-6">
			            <Messages />
			        </div>
			    </div>
			</div>
		)
	}
}
export default Home