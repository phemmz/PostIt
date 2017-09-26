import React from 'react';
import { Route } from 'react-router';
import { ResetPasswordPage,
  CheckVerificationPage, NotificationPage,
  SearchPage, GroupMembersPage } from './components/layout';
import { SignupPage, LoginPage,
 Home, Main, Welcome, NotFoundPage } from './components/presentation';
import CreateGroup from './components/containers/CreateGroup.jsx';
import RequireAuth from './utils/RequireAuth.jsx';
import LoggedIn from './utils/LoggedIn.jsx';

export default (
  <Route component={Main}>
    <Route path="/" component={Welcome} />
    <Route path="signup" component={LoggedIn(SignupPage)} />
    <Route path="login" component={LoggedIn(LoginPage)} />
    <Route path="reset" component={LoggedIn(ResetPasswordPage)} />
    <Route path="verification" component={LoggedIn(CheckVerificationPage)} />
    <Route path="dashboard" component={RequireAuth(Home)} />
    <Route path="group" component={RequireAuth(CreateGroup)} />
    <Route path="notification" component={RequireAuth(NotificationPage)} />
    <Route path="search" component={RequireAuth(SearchPage)} />
    <Route path="members" component={RequireAuth(GroupMembersPage)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
