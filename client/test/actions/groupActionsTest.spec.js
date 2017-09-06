import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import groupActions from '../../src/actions/groupActions';
import { GROUP_CREATE, GROUP_SELECTED, APPLICATION_STATE, ADD_USER, GROUPS_NOT_RECEIVED, GROUP_MESSAGES, SEND_MESSAGE } from '../../src/actions/types';

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
  it('should get all messages in a group GROUP_MESSAGES', () => {
    const groupId = 1;
    const messages = {
      content: 'hello man',
      createdAt: '2017-08-03T12:33:32.666Z',
      groupId: 1,
      id: 1,
      messagecreator: 'phemmz',
      priority: 1,
      readcheck: null,
      updatedAt: '2017-08-03T12:33:32.666Z',
      userId: 1,
    };
    nock('http://localhost.com')
      .get(`api/v1/group/${groupId}/messages`)
      .reply(200, {
        body: {
          confirmation: 'success',
          results: messages
        }
      });
    const expectedActions = [
      {
        type: GROUP_MESSAGES,
        messages
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.groupMessages(groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(groupActions.groupMessages).toEqual(messages);
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
  it('should create an action that post a message', () => {
    const message = {
      content: 'Hello',
      readcheck: 'false',
      priority: '1',
    };
    const groupId = 1;
    nock('http://localhost.com')
      .post(`api/v1/group/${groupId}/message`, message)
      .reply(201, {
        body: {
          confirmation: 'success',
          message: 'Message sent'
        }
      });
    const expectedActions = {
      type: SEND_MESSAGE,
      message
    };
    const store = mockStore({ groupReducer: {} });
    store.dispatch(groupActions.postMessage(groupId, message))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
