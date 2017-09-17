import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import groupActions from '../../src/actions/groupActions';
import { GROUP_CREATE, GROUP_SELECTED,
 APPLICATION_STATE, ADD_USER,
 GROUPS_RECEIVED, GROUP_MEMBERS, GROUPS_NOT_RECEIVED } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Group actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action that creates a group', () => {
    const group = { groupname: 'lagos fellows' };
    nock('http://localhost')
      .post('/api/v1/group', group)
      .reply(201, {
        group: {
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
    return store.dispatch(groupActions.groupCreate(group))
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
        groupname: 'june fellows',
        id: 1,
      },
      {
        groupname: 'law',
        id: 2,
      }
    ];

    nock('http://localhost')
      .get('/api/v1/group')
      .reply(200, {
        results: {
          groups
        }
      });
    const expectedActions = [
      {
        type: APPLICATION_STATE,
        status: 'loading'
      },
      {
        type: GROUPS_RECEIVED,
        groups: { groups }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(groupActions.fetchGroups())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should dispatch an action if no group is received', () => {
    nock('http://localhost')
      .get('/api/v1/group')
      .reply(400);
    const expectedActions = [
      {
        type: APPLICATION_STATE,
        status: 'loading'
      },
      {
        type: GROUPS_NOT_RECEIVED,
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(groupActions.fetchGroups())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that adds a user to a group', () => {
    const userAdded = 'phemmz';
    const groupId = 1;
    nock('http://localhost')
      .post(`/api/v1/group/${groupId}/user`, userAdded)
      .reply(200, {
        results: {
          message: 'User added Successfully'
        }
      });
    const expectedActions = [
      {
        type: ADD_USER,
        addUser: {
          message: 'User added Successfully'
        }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(groupActions.addUser(groupId, userAdded))
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
    nock('http://localhost')
      .get(`/api/v1/members/${groupId}/${offset}/${perPage}`)
      .reply(200, {
        paginatedMembers: {
          members
        }
      });
    const expectedActions = [
      {
        type: GROUP_MEMBERS,
        groupMembers: {
          members
        }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(groupActions.getGroupMembers(groupId, offset, perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
