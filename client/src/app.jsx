import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import Home from './components/layout/Home.jsx';
import SignupPage from './components/layout/SignupPage.jsx';
import LoginPage from './components/layout/LoginPage.jsx';
import Main from './components/layout/Main.jsx';
import Welcome from './components/layout/Welcome.jsx';
import ResetPasswordPage from './components/layout/ResetPasswordPage.jsx';
import CheckVerificationPage from './components/layout/CheckVerificationPage.jsx';
import createGroup from './components/containers/CreateGroup.jsx';
import style from '../main.scss';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import AuthenticationActions from './actions/authActions';
import requireAuth from './utils/requireAuth.jsx';

/**
 * @description The store binds together the 3 principles of redux
 * It holds the current application state object
 * It lets you dispatch actions
 * When you create it, you need to specify reducers
 * @param {*} f
 * @return {*} void
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
        <Route path="/reset" component={ResetPasswordPage} />
        <Route path="/reset/verification" component={CheckVerificationPage} />
        <Route path="/dashboard" component={requireAuth(Home)} />
        <Route path="/group" component={requireAuth(createGroup)} />
      </Route>
    </Router>
  </Provider>,
    document.getElementById('root')
);
