import expect from 'expect';
import messageReducer from '../../src/reducers/messageReducer';
import { GROUP_MESSAGES, SEND_MESSAGE,
  ADD_NOTIFICATION, CLEAR_NOTIFICATION,
  READ_STATUS, READ_LIST, SEARCH_USER } from '../../src/actions/types';

describe('Message Reducer', () => {
  const initialState = {
    groupList: [],
    groupMessages: [],
    list: {},
    notifications: [],
    readStatus: false,
    readList: [],
    searchedUsers: [],
    meta: {}
  };
  it('should handle GROUP_MESSAGES', () => {
    const messages = [
      {
        id: 1,
        content: 'hello man',
        readcheck: null,
        priority: 1,
        messagecreator: 'phemmz',
        userId: 1,
        groupId: 1,
        createdAt: '2017-08-03T12:33:32.666Z',
        updatedAt: '2017-08-03T12:33:32.666Z'
      }
    ];
    const action = { type: GROUP_MESSAGES, messages };
    const newState = messageReducer(initialState, action);

    expect(newState.groupMessages).toEqual(messages);
    expect(newState.groupMessages.messagecreator).toEqual(messages.messagecreator);
  });
  it('should handle SEND_MESSAGE', () => {
    const message =
      {
        id: 1,
        content: 'hello man',
        readcheck: null,
        priority: 1,
        messagecreator: 'phemmz',
        userId: 1,
        groupId: 1,
        createdAt: '2017-08-03T12:33:32.666Z',
        updatedAt: '2017-08-03T12:33:32.666Z'
      };
    const action = { type: SEND_MESSAGE, message };
    const newState = messageReducer(initialState, action);

    expect(newState.list).toEqual(message);
    expect(newState.list.messagecreator).toEqual(message.messagecreator);
  });
  it('should return default state', () => {
    const action = { type: 'NO_ACTION' };
    const newState = messageReducer(initialState, action);

    expect(newState).toEqual(initialState);
    expect(newState.groupList).toEqual([]);
  });
  it('should handle ADD_NOTIFICATION', () => {
    const notification = 'Phemmz just posted a new message';
    const action = { type: ADD_NOTIFICATION, notification };
    const newState = messageReducer(initialState, action);

    expect(newState.notifications).toEqual(notification);
  });
  it('should handle CLEAR_NOTIFICATION', () => {
    const notification = [];
    const action = { type: CLEAR_NOTIFICATION, notification };
    const newState = messageReducer(initialState, action);

    expect(newState.notifications).toEqual(notification);
  });
  it('should handle READ_STATUS', () => {
    const status = true;
    const action = { type: READ_STATUS, status };
    const newState = messageReducer(initialState, action);

    expect(newState.readStatus).toEqual(status);
  });
  it('should handle READ_LIST', () => {
    const readList = ['ab12', 'phemmz', 'user1'];
    const action = { type: READ_LIST, readList };
    const newState = messageReducer(initialState, action);

    expect(newState.readList).toEqual(readList);
  });
  it('should handle SEARCH_USER', () => {
    const searchedUsers = [
      {
        username: 'user1',
        email: 'user1@gmail.com',
        phoneNumber: '8717718187'
      },
      {
        username: 'user2',
        email: 'user2@gmail.com',
        phoneNumber: '871221187'
      }
    ];
    const action = { type: SEARCH_USER, searchedUsers };
    const newState = messageReducer(initialState, action);

    expect(newState.searchedUsers).toEqual(searchedUsers);
  });
});

