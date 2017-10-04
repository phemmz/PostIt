import expect from 'expect';
import messageReducer from '../../src/reducers/messageReducer';
import { GROUP_MESSAGES, SEND_MESSAGE,
  ADD_NOTIFICATION, CLEAR_NOTIFICATION,
  READ_STATUS, READ_LIST, NO_GROUP_MESSAGES,
  SET_GROUP_NAME } from '../../src/actions/types';
import { initialMessageState, messages, notification, readList, groupName } from
 '../__mockData__/dummyData';

describe('Message Reducer', () => {
  it('should handle GROUP_MESSAGES', () => {
    const action = { type: GROUP_MESSAGES, messages: [messages] };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.groupMessages).toEqual([messages]);
    expect(newState.groupMessages[0].messagecreator).toEqual(
      messages.messagecreator);
  });
  it('should handle NO_GROUP_MESSAGES', () => {
    const action = { type: NO_GROUP_MESSAGES, messages: [] };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.groupMessages).toEqual([]);
  });
  it('should handle SEND_MESSAGE', () => {
    const message = messages;
    const action = { type: SEND_MESSAGE, message };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.groupMessages).toEqual([message]);
  });
  it('should return default state', () => {
    const action = { type: 'NO_ACTION' };
    const newState = messageReducer(initialMessageState, action);

    expect(newState).toEqual(initialMessageState);
    expect(newState.groupList).toEqual([]);
  });
  it('should handle ADD_NOTIFICATION', () => {
    const action = { type: ADD_NOTIFICATION, notification };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.notifications).toEqual(notification);
  });
  it('should handle CLEAR_NOTIFICATION', () => {
    const action = { type: CLEAR_NOTIFICATION, notification: [] };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.notifications).toEqual([]);
  });
  it('should handle READ_STATUS', () => {
    const action = { type: READ_STATUS, status: true };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.readStatus).toEqual(true);
  });
  it('should handle READ_LIST', () => {
    const action = { type: READ_LIST, readList };
    const newState = messageReducer(initialMessageState, action);

    expect(newState.readList).toEqual(readList);
  });
  it('should handle SET_GROUP_NAME', () => {
    const action = { type: SET_GROUP_NAME, groupName: [groupName] };
    const newState = messageReducer(initialMessageState, action);
    expect(newState.groupName).toEqual([groupName]);
  });
});

