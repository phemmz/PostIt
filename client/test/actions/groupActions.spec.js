import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import groupActions from '../../src/actions/groupActions';
import { GROUP_CREATE, GROUP_SELECTED,
 APPLICATION_STATE, ADD_USER,
 GROUPS_RECEIVED, GROUP_MEMBERS,
 GROUPS_NOT_RECEIVED } from '../../src/actions/types';
import { user, group, groups, metaData } from '../__mockData__/dummyData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Group actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action that creates a group', () => {
    nock('http://localhost')
      .post('/api/v1/group', { groupname: group.groupname })
      .reply(201, {
        group: {
          confirmation: 'success',
          message: 'lagos fellows successfully created'
        }
      });
    const expectedActions = [
      {
        type: GROUP_CREATE,
        group: { groupname: group.groupname }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(groupActions.groupCreate(
      { groupname: group.groupname }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that saves the id of the GROUP_SELECTED', () => {
    const expectedAction = {
      type: GROUP_SELECTED,
      selectedGroup: group.groupId
    };
    expect(groupActions.groupSelected(group.groupId)).toEqual(expectedAction);
  });
  it('should create an action that fetch all groups a user belongs to', () => {
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
    nock('http://localhost')
      .post(`/api/v1/group/${group.groupId}/user`, user.username)
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
    return store.dispatch(groupActions.addUser(group.groupId, user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that gets all users in a group', () => {
    nock('http://localhost').get(
      `/api/v1/members/${group.groupId}/${metaData.offset}/${metaData.perPage}`)
      .reply(200, {
        paginatedMembers: {
          members: user
        }
      });
    const expectedActions = [
      {
        type: GROUP_MEMBERS,
        groupMembers: {
          members: user
        }
      }
    ];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(
      groupActions.getGroupMembers(
        group.groupId, metaData.offset, metaData.perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
