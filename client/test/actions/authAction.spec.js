import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import MocalLocalStorage from 'mock-localstorage';
import authActions from '../../src/actions/authActions';
import { user } from '../__mockData__/dummyData';
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

const token = user[0].token;

describe('Login action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_CURRENT_USER on login', () => {
    nock('http://localhost')
      .post('/api/v1/user/signin')
      .reply(200);

    const expectedActions = [{ type: SET_CURRENT_USER,
      user: {
        username: user[0].username,
        password: user[0].password
      }
    }];

    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', token);

    return store.dispatch(authActions.login(user[0]))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('User action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates an action for resetting password', () => {
    nock('http://localhost')
      .post('/api/v1/reset', user[0].username)
      .reply(200);

    const expectedActions = [];
    const store = mockStore({ auth: {} });

    return store.dispatch(authActions.resetPassword(user[0].username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates SET_CURRENT_USER for google authentication', () => {
    nock('http://localhost')
    .post('/api/v1/auth/google', user[0])
    .reply(200);

    const expectedActions = [{ type: SET_CURRENT_USER,
      user: {
        username: user[0].username,
        password: user[0].password
      }
    }];

    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', user[0].token);

    return store.dispatch(authActions.googleAuthentication(user[0]))
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
