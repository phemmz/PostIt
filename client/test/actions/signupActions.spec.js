import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import MocalLocalStorage from 'mock-localstorage';
import signupActions from '../../src/actions/signupActions';
import { SET_CURRENT_USER } from '../../src/actions/types';
import { user } from '../__mockData__/dummyData';

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

describe('Signup actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates an action that creates a new account', () => {
    nock('http://localhost')
      .post('/api/v1/user/signup')
      .reply(200);

    const expectedActions = [{
      type: SET_CURRENT_USER,
      user: {
        username: user[0].username,
        password: user[0].password
      }
    }];

    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', user[0].token);

    return store.dispatch(signupActions.userSignupRequest(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates an action that checks if a user exist', () => {
    const identifier = 'man';
    nock('http://localhost.com')
      .get(`/api/v1/user/${identifier}`)
      .reply(200);

    const expectedActions = [];
    const store = mockStore({ users: [] });
    store.dispatch(signupActions.isUserExists(identifier))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates an action that updates the password of a user', () => {
    nock('http://localhost.com')
      .put('/api/v1/user/signup', {
        username: user[1].username,
        password: user[1].password,
        passwordConfirmation: user[1].passwordConfirmation
      })
      .reply(201);

    const expectedActions = [];
    const store = mockStore({ users: [] });

    store.dispatch(signupActions.updatePassword(user[1]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
