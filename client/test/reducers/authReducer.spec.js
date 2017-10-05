import expect from 'expect';
import auth from '../../src/reducers/auth';
import { SET_CURRENT_USER } from '../../src/actions/types';
import { user, initialAuthState } from '../__mockData__/dummyData';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialAuthState);
  });
  it('should handle SET_CURRENT_USER', () => {
    const action = { type: SET_CURRENT_USER, user: user[0] };
    const newState = auth(initialAuthState, action);

    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(user[0]);
  });
  it('should return false for isAuthenticated when auth is passed with empty action', () => {  // eslint-disable-line
    const action = { type: SET_CURRENT_USER, user: user[3] };
    const newState = auth(initialAuthState, action);

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual(user[3]);
  });
});

