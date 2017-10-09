import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import UserActions from '../../src/actions/userActions';
import { GET_ALL_USERS, SEARCH_USER } from '../../src/actions/types';
import { user, metaData } from '../__mockData__/dummyData';

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

  it('should get all users', () => {
    nock('http://localhost')
      .get('/api/v1/user')
      .reply(200, {
        result: user
      });

    const expectedActions = [
      { type: GET_ALL_USERS,
        users: user
      }
    ];
    const store = mockStore({ users: [] });
    return store.dispatch(UserActions.getUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action that searches for users', () => {
    nock('http://localhost')
      .get(`/api/v1/search/u/${metaData.offset}/${metaData.perPage}`)
      .reply(200, {
        searchedUsers: {
          results: user
        }
      });

    const expectedActions = [
      {
        type: SEARCH_USER,
        searchedUsers: {
          results: user
        }
      }
    ];

    const store = mockStore({ groupReducer: {} });
    return store.dispatch(
      UserActions.searchUser('u', metaData.offset, metaData.perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
