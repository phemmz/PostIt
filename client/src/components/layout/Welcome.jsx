import React, { Component} from 'react';

class Welcome extends Component {

	render() {
		return (
			<div className="welc" style={{marginTop: "18rem", marginLeft:"7rem"}}>
				<div style={{paddingTop: "3rem"}}>
					<h3 className="green-text text-darken-4">Welcome,</h3>
					<p className="green-text text-darken-2">POSTIT allows you,your friends and colleagues to create groups for notifications.</p>
			    </div>
			</div>
		)
	}



}

export default Welcome