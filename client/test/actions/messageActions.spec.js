import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import messageActions from '../../src/actions/messageActions';
import { GROUP_MESSAGES, SEND_MESSAGE,
 READ_STATUS, READ_LIST, SEARCH_USER,
 ADD_NOTIFICATION, CLEAR_NOTIFICATION } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Message actions', () => {
  afterEach(() => {
    nock.cleanAll();
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
    nock('http://localhost')
      .get(`/api/v1/group/${groupId}/messages`)
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
    return store.dispatch(messageActions.groupMessages(groupId))
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
    nock('http://localhost')
      .post(`/api/v1/group/${groupId}/message`, message)
      .reply(201, {
        results: {
          message
        }
      });
    const expectedActions = [{
      type: SEND_MESSAGE,
      message: {
        message
      }
    }];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(messageActions.postMessage(groupId, message))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that updates read status', () => {
    const groupId = 1;
    nock('http://localhost')
      .post(`/api/v1/group/${groupId}/readStatus`)
      .reply(200);
    const expectedActions = [{
      type: READ_STATUS
    }];
    const store = mockStore({ groupReducer: {} });
    return store.dispatch(messageActions.updateReadStatus(groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should get all users that have read a message', () => {
    const groupId = 1;
    const readList = ['phemmz', 'tuna'];
    nock('http://localhost')
      .get(`/api/v1/group/${groupId}/readStatus`)
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
    return store.dispatch(messageActions.readList(groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates an action for adding new message notification', () => {
    const notification = 'new message from ksung group';
    const expectedActions = [{
      type: ADD_NOTIFICATION,
      notification
    }];
    const store = mockStore({ auth: {} });
    store.dispatch(messageActions.addNotification(notification));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('creates an action for clearing new message notifications', () => {
    const expectedActions = [{
      type: CLEAR_NOTIFICATION,
    }];
    const store = mockStore({ auth: {} });
    store.dispatch(messageActions.clearNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
