import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import { Home, LoginPage, SignupPage, Main, Welcome, ResetPasswordPage, CheckVerificationPage, NotificationPage, SearchPage } from './components/layout';
import CreateGroup from './components/containers/CreateGroup.jsx';
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
        <Route path="/group" component={requireAuth(CreateGroup)} />
        <Route path="/notification" component={requireAuth(NotificationPage)} />
        <Route path="/search" component={requireAuth(SearchPage)} />
      </Route>
    </Router>
  </Provider>,
    document.getElementById('root')
);
