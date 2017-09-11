import React from 'react';
import { Route } from 'react-router';
import { ResetPasswordPage, CheckVerificationPage, NotificationPage, SearchPage } from './components/layout';
import { SignupPage, LoginPage, Home, Main, Welcome, NotFoundPage } from './components/presentation';
import CreateGroup from './components/containers/CreateGroup.jsx';
import requireAuth from './utils/requireAuth.jsx';
import LoggedIn from './utils/LoggedIn.jsx';

export default (
  <Route component={Main}>
    <Route path="/" component={Welcome} />
    <Route path="/signup" component={LoggedIn(SignupPage)} />
    <Route path="/login" component={LoggedIn(LoginPage)} />
    <Route path="/reset" component={LoggedIn(ResetPasswordPage)} />
    <Route path="/verification" component={LoggedIn(CheckVerificationPage)} />
    <Route path="/dashboard" component={requireAuth(Home)} />
    <Route path="/group" component={requireAuth(CreateGroup)} />
    <Route path="/notification" component={requireAuth(NotificationPage)} />
    <Route path="/search" component={requireAuth(SearchPage)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
