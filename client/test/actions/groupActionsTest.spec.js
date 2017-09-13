import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import groupActions from '../../src/actions/groupActions';
import { GROUP_CREATE, GROUP_SELECTED,
 APPLICATION_STATE, ADD_USER,
  GROUPS_NOT_RECEIVED, GROUP_MEMBERS } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Group actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action that creates a group', () => {
    const group = { groupname: 'lagos fellows' };
    nock('http://localhost.com')
      .post('/api/v1/group', group)
      .reply(201, {
        body: {
          confirmation: 'success',
          message: 'lagos fellows successfully created'
        }
      });
    const expectedActions = [
      {
        type: GROUP_CREATE,
        group
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.groupCreate(group))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that saves the id of the GROUP_SELECTED', () => {
    const groupId = 1;
    const expectedAction = {
      type: GROUP_SELECTED,
      selectedGroup: groupId
    };
    expect(groupActions.groupSelected(groupId)).toEqual(expectedAction);
  });
  it('should create an action that fetch all groups a user belongs to', () => {
    const groups = [
      {
        createdAt: '2017-08-15T17:40:00.318Z',
        groupname: 'june fellows',
        id: 1,
        updatedAt: '2017-08-15T17:40:00.318Z'
      },
      {
        createdAt: '2017-08-16T00:09:38.097Z',
        groupname: 'law',
        id: 2,
        updatedAt: '2017-08-16T00:09:38.097Z'
      }
    ];

    nock('http://localhost.com')
      .get('/api/v1/group')
      .reply(200, {
        body: {
          confirmation: 'success',
          results: groups
        }
      });
    const expectedActions = [
      {
        type: APPLICATION_STATE,
        status: 'loading'
      },
      {
        type: GROUPS_NOT_RECEIVED
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.fetchGroups())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that adds a user to a group', () => {
    const userAdded = 'phemmz';
    const groupId = 1;
    nock('http://localhost.com')
      .post(`api/v1/group/${groupId}/user`, userAdded)
      .reply(201, {
        body: {
          confirmation: 'success',
          message: 'User added successfully'
        }
      });
    const expectedActions = [
      {
        type: ADD_USER
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.addUser(groupId, userAdded))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that gets all users in a group', () => {
    const groupId = 1;
    const offset = 0;
    const perPage = 5;
    const members = [
      {
        id: 1,
        username: 'boy1',
        email: 'boy1@gmail.com',
        phoneNumber: '99999999'
      },
      {
        id: 1,
        username: 'boy2',
        email: 'boy2@gmail.com',
        phoneNumber: '1234443454'
      }
    ];
    nock('http://localhost.com')
      .get(`api/v1/members/${groupId}/${offset}/${perPage}`)
      .reply(200, {
        body: {
          confirmation: 'success',
          results: members
        }
      });
    const expectedActions = [
      {
        type: GROUP_MEMBERS,
        members
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.getGroupMembers(groupId, offset, perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
