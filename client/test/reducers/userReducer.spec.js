import expect from 'expect';
import userReducer from '../../src/reducers/userReducer';
import { GET_ALL_USERS, SEARCH_USER } from '../../src/actions/types';
import { initialUserState, user } from
'../__mockData__/dummyData';

describe('User Reducer', () => {
  it('should return default state for invalid action type', () => {
    const users = user;
    const action = { type: 'NOT_GET_ALL_USERS', users };
    const newState = userReducer(initialUserState, action);

    expect(newState).toEqual(initialUserState);
  });
  it('should handle GET_ALL_USERS', () => {
    const users = user;
    const action = { type: GET_ALL_USERS, users };
    const newState = userReducer(initialUserState, action);

    expect(newState.users).toEqual(users);
    expect(newState.users[0].username).toEqual(users[0].username);
    expect(newState.users[0].email).toEqual(users[0].email);
  });
  it('should handle SEARCH_USER for searching users', () => {
    const searchedUsers = user;
    const action = { type: SEARCH_USER, searchedUsers };
    const newState = userReducer(initialUserState, action);

    expect(newState.searchedUsers).toEqual(searchedUsers);
  });
});
