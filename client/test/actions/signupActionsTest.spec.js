import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import signupActions from '../../src/actions/signupActions';
import { SET_CURRENT_USER } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signup actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates an action that creates an account for new users', () => {
    const userData = {
      username: 'femz',
      password: '123456',
      email: 'femz@gmail.com',
      phoneNumber: '1299912',
      passwordConfirmation: '123456'
    };
    const user = {
      userId: 1,
      username: 'boy',
      email: 'boy@gmail.com',
      iat: 1505049846
    };
    nock('http://localhost.com')
      .post('/api/v1/user/signup', userData)
      .reply(201, {
        body: { token: 'abcderf', message: { userId: 1 } }
      });
    const expectedActions = [{
      type: SET_CURRENT_USER,
      user
    }];
    const store = mockStore({ auth: {} });
    store.dispatch(signupActions.userSignupRequest(userData))
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
