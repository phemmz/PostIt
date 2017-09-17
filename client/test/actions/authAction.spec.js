import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import MocalLocalStorage from 'mock-localstorage';
import authActions from '../../src/actions/authActions';
import { SET_CURRENT_USER } from '../../src/actions/types';

jest.mock('jwt-decode', () => {
  return () => {
    return {
      username: 'femz',
      password: '123456'
    };
  };
});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockStorage = new MocalLocalStorage();

window.localStorage = mockStorage;

const token = 'abcdef';

describe('Login action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates SET_CURRENT_USER when login has been done', () => {
    nock('http://localhost')
      .post('/api/v1/user/signin')
      .reply(200);
    const user = { username: 'femz', password: '123456' };
    const expectedActions = [{ type: SET_CURRENT_USER,
      user }];
    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', token);
    return store.dispatch(authActions.login(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe('User action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates SET_CURRENT_USER for google authentication', () => {
    const user = { username: 'femz', password: '123456' };
    nock('http://localhost')
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
    const user = {
      username: 'femz'
    };
    nock('http://localhost')
      .post('/api/v1/reset', user)
      .reply(200);
    const expectedActions = [];
    const store = mockStore({ auth: {} });
    return store.dispatch(authActions.resetPassword(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates an action for google authentication', () => {
    const user = {
      username: 'femz',
      password: '123456'
    };
    nock('http://localhost')
    .post('/api/v1/auth/google', user)
    .reply(200);
    const expectedActions = [{ type: SET_CURRENT_USER,
      user }];
    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', token);
    return store.dispatch(authActions.googleAuthentication(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates an action for logging out', () => {
    const expectedActions = [{ type: SET_CURRENT_USER,
      user: {} }];
    const store = mockStore({ auth: {} });
    mockStorage.removeItem('jwtToken');
    store.dispatch(authActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
