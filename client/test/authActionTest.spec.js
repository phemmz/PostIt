import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import authActions from '../src/actions/authActions';
import { SET_CURRENT_USER } from '../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// describe('actions', () => {
//   it('should set current user', () => {
//     const user = 'femi';
//     const expectedAction = {
//       type: SET_CURRENT_USER,
//     };
//     expect(authActions.setCurrentUser(user)).toEqual(expectedAction);
//   });
// });
describe('Login action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_CURRENT_USER when login has been done', () => {
    const user = { username: 'femz', password: '123456' };
    nock('http://localhost.com')
      .post('/user/signin', user)
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
