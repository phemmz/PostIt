import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="footer-copyright">
					<div classNme="container">					
						<p>
							&copy; <script type="text/javascript">document.write(new Date().getFullYear());</script> Andela, Inc
						</p>					
					</div>

				</div>
		</footer>
		)
	}
}

export default Footer;