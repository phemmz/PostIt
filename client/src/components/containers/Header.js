import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<div className="card-panel teal lighten-2">
				<div className="reg">
					<em className="post">POSTIT</em>
			
					<a href="./homepage" className="waves-effect waves-light btn lgout" style={{marginLeft: 70}}>Logout</a>
				</div>
			</div>
		)
	}
}

export default Header;