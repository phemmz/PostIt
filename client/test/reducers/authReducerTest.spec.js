import expect from 'expect';
import auth from '../../src/reducers/auth';
import { SET_CURRENT_USER } from '../../src/actions/types';

describe('Auth Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });
  it('should handle SET_CURRENT_USER', () => {
    const user = {
      user: {
        userId: 1,
        username: 'phemmz',
        email: 'phemmz@gmail.com'
      }
    };
    const action = { type: SET_CURRENT_USER, user };
    const newState = auth(initialState, action);

    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(user);
  });
  it('should return false for isAuthenticated when auth is passed with empty action', () => {
    const user = {};
    const action = { type: SET_CURRENT_USER, user };
    const newState = auth(initialState, action);

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual(user);
  });
});

