import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import messageActions from '../../src/actions/messageActions';
import { GROUP_MESSAGES, SEND_MESSAGE,
 READ_STATUS, READ_LIST,
 ADD_NOTIFICATION, CLEAR_NOTIFICATION,
 NO_GROUP_MESSAGE, SET_GROUP_NAME } from '../../src/actions/types';
import { group, notification,
  readList, messages, groupName } from '../__mockData__/dummyData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Message actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all messages in a group', () => {
    nock('http://localhost')
      .get(`/api/v1/group/${group.groupId}/messages`)
      .reply(200, {
        results: {
          messages
        }
      });

    const expectedActions = [
      {
        type: GROUP_MESSAGES,
        messages: {
          messages
        }
      }
    ];

    const store = mockStore({ groupReducer: {} });

    return store.dispatch(messageActions.groupMessages(group.groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return no group message', () => {
    nock('http://localhost')
      .get(`/api/v1/group/${group.groupId}/messages`)
      .reply(404, {
        message: {}
      });

    const expectedActions = [
      {
        type: NO_GROUP_MESSAGE
      }
    ];

    const store = mockStore({ groupReducer: {} });

    return store.dispatch(messageActions.groupMessages(group.groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action that post a message', () => {
    nock('http://localhost')
      .post(`/api/v1/group/${group.groupId}/message`, messages)
      .reply(201, {
        results: {
          messages
        }
      });

    const expectedActions = [{
      type: SEND_MESSAGE,
      message: {
        messages
      }
    }];

    const store = mockStore({ groupReducer: {} });
    return store.dispatch(messageActions.postMessage(group.groupId, messages))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action that updates read status', () => {
    nock('http://localhost')
      .post(`/api/v1/group/${group.groupId}/readStatus`)
      .reply(200);

    const expectedActions = [{
      type: READ_STATUS
    }];

    const store = mockStore({ groupReducer: {} });

    return store.dispatch(messageActions.updateReadStatus(group.groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should get all users that have read a message', () => {
    nock('http://localhost')
      .get(`/api/v1/group/${group.groupId}/readStatus`)
      .reply(200, {
        uniqueList: {
          readList
        }
      });

    const expectedActions = [
      {
        type: READ_LIST,
        readList: {
          readList
        }
      }
    ];

    const store = mockStore({ groupReducer: {} });

    return store.dispatch(messageActions.readList(group.groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action for adding new message notification', () => {
    const expectedActions = [{
      type: ADD_NOTIFICATION,
      notification
    }];

    const store = mockStore({ auth: {} });

    store.dispatch(messageActions.addNotification(notification));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action for clearing new message notifications', () => {
    const expectedActions = [{
      type: CLEAR_NOTIFICATION,
    }];

    const store = mockStore({ auth: {} });

    store.dispatch(messageActions.clearNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action for setting groupname to redux store', () => {
    const expectedActions = [{
      type: SET_GROUP_NAME,
      groupName
    }];

    const store = mockStore({ auth: {} });

    store.dispatch(messageActions.setGroupName(groupName));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
