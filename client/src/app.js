import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import Home from './components/layout/Home.js';
import SignupPage from './components/layout/SignupPage.js';
import LoginPage from './components/layout/LoginPage';
import Main from './components/layout/Main.js';
import Welcome from './components/layout/Welcome.js';
import MessageBoard from './components/layout/MessageBoard.js';
import style from '../main.scss';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';

const store = createStore(
	rootReducer,
	compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
	<Provider store={store}>
		<Router history={browserHistory}>		
		    <Route component={Main}>
		        <Route path="/" component={Welcome} />
		        <Route path="/signup" component={SignupPage} />
			    <Route path="/login" component={LoginPage} />
	   		    <Route path="/dashboard" component={Home} />
	   		    <Route path="/messageboard/:id" component={MessageBoard} />
			   
			</Route>	
		</Router>
	</Provider>,
	 document.getElementById('root')
);