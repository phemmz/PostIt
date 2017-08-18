import React, { Component } from 'react';
import Groups from '../containers/Groups';
import Messages from '../containers/Messages';

/**
 * Home class
 */
class Home extends Component {
	render() {
		return (
			<div className="container-fluid">	
				<div className="row dashboard-layout">
          <div className="col s5 m3 group">			
            <Groups />
          </div>
          <div className="col s7 m9 messages">
            <Messages />
          </div>
        </div>
			</div>
		)
	}
}
export default Home;