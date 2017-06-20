import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Groups from './components/Groups';
import Header from './components/Header';
import style from '../main.scss';
//import Footer from './components/Footer';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				Hello React!
				<Groups />				
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));