import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import messageActions from '../../src/actions/messageActions';
import { GROUP_MESSAGES, SEND_MESSAGE, READ_STATUS, READ_LIST, SEARCH_USER } from '../../src/actions/types';

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
    store.dispatch(messageActions.groupMessages(groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(messageActions.groupMessages).toEqual(messages);
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
    store.dispatch(messageActions.postMessage(groupId, message))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action that updates read status', () => {
    const groupId = 1;
    nock('http://localhost.com')
      .post(`api/v1/group/${groupId}/readStatus`)
      .reply(200, {
        body: {
          confirmation: 'success',
          message: 'Status updated'
        }
      });
    const expectedActions = {
      type: READ_STATUS
    };
    const store = mockStore({ groupReducer: {} });
    store.dispatch(messageActions.updateReadStatus(groupId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should get all users that have read a message', () => {
    const groupId = 1;
    const readList = ['phemmz', 'tuna'];
    nock('http://localhost.com')
      .get(`api/v1/group/${groupId}/readStatus`)
      .reply(200, {
        body: {
          confirmation: 'success',
          results: readList
        }
      });
    const expectedActions = [
      {
        type: READ_LIST,
        readList
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(messageActions.readList(groupId))
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
    nock('http://localhost.com')
      .get(`api/v1/search/${searchKey}/${offset}/${perPage}`)
      .reply(200, {
        body: {
          confirmation: 'success',
          results: searchedUsers
        }
      });
    const expectedActions = [
      {
        type: SEARCH_USER,
        searchedUsers
      }
    ];
    const store = mockStore({ groupReducer: {} });
    store.dispatch(messageActions.searchUser(searchKey, offset, perPage))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
