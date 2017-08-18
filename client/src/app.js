import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import Home from './components/layout/Home.js';
import SignupPage from './components/layout/SignupPage.js';
import LoginPage from './components/layout/LoginPage';
import Main from './components/layout/Main.js';
import Welcome from './components/layout/Welcome.js';
import createGroup from './components/containers/CreateGroup.js';
import style from '../main.scss';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import AuthenticationActions from './actions/authActions';
import requireAuth from './utils/requireAuth';

/**
 * @description The store binds together the 3 principles of redux
 * It holds the current application state object
 * It lets you dispatch actions
 * When you create it, you need to specify reducers 
 */
const store = createStore(
	rootReducer,
	compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(AuthenticationActions.setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
	<Provider store={store}>
		<Router history={browserHistory}>		
		    <Route component={Main}>
		        <Route path="/" component={Welcome} />
		        <Route path="/signup" component={SignupPage} />
						<Route path="/login" component={LoginPage} />
	   		    <Route path="/dashboard" component={requireAuth(Home)} />
	   		    <Route path="/group" component={requireAuth(createGroup)} />
			</Route>	
		</Router>
	</Provider>,
	 document.getElementById('root')
);