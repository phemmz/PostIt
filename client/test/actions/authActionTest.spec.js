import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import authActions from '../../src/actions/authActions';
import { SET_CURRENT_USER, GET_ALL_USERS } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_CURRENT_USER when login has been done', () => {
    const user = { username: 'femz', password: '123456' };
    nock('http://localhost.com')
      .post('/api/v1/user/signin', user)
      .reply(200, {
        body: { token: 'abcderf', user: { userId: 1 } }
      });
    const expectedActions = [{ type: SET_CURRENT_USER,
      user }];
    const store = mockStore({ auth: {} });
    store.dispatch(authActions.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe('User action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('gets all users', () => {
    nock('http://localhost.com')
      .get('/api/v1/user')
      .reply(200, {
        body: [
          {
            id: 1, username: 'phemz1', email: 'phemz1@gmail.com'
          },
          {
            id: 2, username: 'phemz', email: 'phemz@gmail.com'
          }
        ]
      });
    const users = [
      {
        id: 1, username: 'phemz1', email: 'phemz1@gmail.com'
      },
      {
        id: 2, username: 'phemz', email: 'phemz@gmail.com'
      }
    ];
    const expectedActions = [
      { type: GET_ALL_USERS,
        users
      }
    ];
    const store = mockStore({ users: [] });
    store.dispatch(authActions.getUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates SET_CURRENT_USER for google authentication', () => {
    const user = { username: 'femz', password: '123456' };
    nock('http://localhost.com')
      .post('/api/v1/auth/google', user)
      .reply(200, {
        body: { token: 'abcderf', user: { userId: 1 } }
      });
    const expectedActions = [{ type: SET_CURRENT_USER,
      user }];
    const store = mockStore({ auth: {} });
    store.dispatch(authActions.googleAuthentication(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates an action for resetting password', () => {
    const username = 'femz';
    nock('http://localhost.com')
      .post('/api/v1/reset', username)
      .reply(200);
    const expectedActions = [];
    const store = mockStore({ auth: {} });
    store.dispatch(authActions.resetPassword(username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
