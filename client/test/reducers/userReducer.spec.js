import expect from 'expect';
import userReducer from '../../src/reducers/userReducer';
import { GET_ALL_USERS, SEARCH_USER } from '../../src/actions/types';

describe('User Reducer', () => {
  const initialState = {
    users: [],
    searchedUsers: [],
    meta: {}
  };
  it('should return default state', () => {
    const users = [
      {
        id: 1,
        username: 'phemz1',
        email: 'phemz1@gmail.com'
      },
      {
        id: 2,
        username: 'hello000',
        email: 'hello000@gmail.com'
      }
    ];
    const action = { type: 'NOT_GET_ALL_USERS', users };
    const newState = userReducer(initialState, action);

    expect(newState.users).toEqual([]);
  });
  it('should handle GET_ALL_USERS', () => {
    const users = [
      {
        id: 1,
        username: 'phemz1',
        email: 'phemz1@gmail.com'
      },
      {
        id: 2,
        username: 'hello000',
        email: 'hello000@gmail.com'
      }
    ];
    const action = { type: GET_ALL_USERS, users };
    const newState = userReducer(initialState, action);

    expect(newState.users).toEqual(users);
    expect(newState.users[0].username).toEqual(users[0].username);
    expect(newState.users[0].email).toEqual(users[0].email);
  });
  it('should return default state when GET_ALL_USERS is not passed', () => {
    const users = {};
    const action = { type: 'hello', users };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
  it('should handle SEARCH_USER', () => {
    const searchedUsers = [
      {
        username: 'user1',
        email: 'user1@gmail.com',
        phoneNumber: '8717718187'
      },
      {
        username: 'user2',
        email: 'user2@gmail.com',
        phoneNumber: '871221187'
      }
    ];
    const action = { type: SEARCH_USER, searchedUsers };
    const newState = userReducer(initialState, action);

    expect(newState.searchedUsers).toEqual(searchedUsers);
  });
});
