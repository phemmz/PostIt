import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import UserActions from '../../src/actions/userActions';
import { GET_ALL_USERS, SEARCH_USER } from '../../src/actions/types';

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

describe('User action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('gets all users', () => {
    nock('http://localhost')
      .get('/api/v1/user')
      .reply(200, {
        result: [
          {
            id: 1, username: 'phemz1', email: 'phemz1@gmail.com'
          },
          {
            id: 2, username: 'phemz', email: 'phemz@gmail.com'
          }
        ]
      });
    const users = [
      {
        id: 1, username: 'phemz1', email: 'phemz1@gmail.com'
      },
      {
        id: 2, username: 'phemz', email: 'phemz@gmail.com'
      }
    ];
    const expectedActions = [
      { type: GET_ALL_USERS,
        users
      }
    ];
    const store = mockStore({ users: [] });
    return store.dispatch(UserActions.getUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action that searches for users', () => {
    const searchKey = 'b';
    const offset = 0;
    const perPage = 5;
    const searchedUsers = [
      {
        username: 'boy1',
        email: 'boy1@gmail.com',
        phoneNumber: '99999999'
      },
      {
        username: 'boy2',
        email: 'boy2@gmail.com',
        phoneNumber: '1234443454'
      }
    ];
    nock('http://localhost')
      .get(`/api/v1/search/${searchKey}/${offset}/${perPage}`)
      .reply(200, {
        searchedUsers: {
          results: searchedUsers
        }
      });
    const expectedActions = [
      {
        type: SEARCH_USER,
        searchedUsers: {
          results: searchedUsers
        }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(UserActions.searchUser(searchKey, offset, perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
