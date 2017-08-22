import expect from 'expect';
import userReducer from '../../src/reducers/userReducer';
import { GET_ALL_USERS } from '../../src/actions/types';

describe('Group Reducer', () => {
  const initialState = {
    users: []
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
});
