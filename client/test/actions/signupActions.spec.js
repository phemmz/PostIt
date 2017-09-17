import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import MocalLocalStorage from 'mock-localstorage';
import signupActions from '../../src/actions/signupActions';
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

describe('Signup actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates an action that creates an account for new users', () => {
    const user = {
      username: 'femz',
      password: '123456',
    };
    nock('http://localhost')
      .post('/api/v1/user/signup')
      .reply(200);
    const expectedActions = [{
      type: SET_CURRENT_USER,
      user
    }];
    const store = mockStore({ auth: {} });
    mockStorage.setItem('jwtToken', token);
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
    const newUser = {
      username: 'boy',
      password: 'boyboy',
      passwordConfirmation: 'boyboy'
    };
    nock('http://localhost.com')
      .put('/api/v1/user/signup', newUser)
      .reply(201);
    const expectedActions = [];
    const store = mockStore({ users: [] });
    store.dispatch(signupActions.updatePassword(newUser))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
