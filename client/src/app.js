import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Groups from './components/containers/Groups';
import Header from './components/containers/Header';
import style from '../main.scss';
import Footer from './components/containers/Footer';

class App extends Component {
	render() {
		return (
			<div>
				<Header />				
				<Groups />	
				<Footer />			
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));