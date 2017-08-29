import expect from 'expect';
import groupReducer from '../../src/reducers/groupReducer';
import { GROUP_CREATE, GROUP_SELECTED, GROUPS_RECEIVED, GROUPS_NOT_RECEIVED, APPLICATION_STATE, GROUP_MESSAGES, ADD_USER, SEND_MESSAGE } from '../../src/actions/types';

describe('Group Reducer', () => {
  const initialState = {
    groupList: [],
    selectedGroup: null,
    groupMessages: [],
    appStatus: 'ready',
    list: {}
  };
  it('should handle GROUP_CREATE', () => {
    const group = {
      id: 12,
      groupname: 'random',
    };
    const action = { type: GROUP_CREATE, group };
    const newState = groupReducer(initialState, action);

    expect(newState.groupList).toEqual([group]);
  });
  it('should set the groupId of the group selected to the state when passed GROUP_SELECTED', () => {
    const selectedGroup = {
      id: 12
    };
    const action = { type: GROUP_SELECTED, selectedGroup };
    const newState = groupReducer(initialState, action);

    expect(newState.selectedGroup).toEqual(selectedGroup);
  });
  it('should set the groupId of the group selected to the state when passed GROUP_SELECTED', () => {
    const selectedGroup = {
      id: 12
    };
    const action = { type: GROUP_SELECTED, selectedGroup };
    const newState = groupReducer(initialState, action);

    expect(newState.selectedGroup).toEqual(selectedGroup);
  });
  it('should handle APPLICATION_STATE', () => {
    const action = { type: APPLICATION_STATE, status: 'loading' };
    const newState = groupReducer(initialState, action);

    expect(newState.appStatus).toEqual('loading');
  });
  it('should handle GROUPS_RECEIVED', () => {
    const groups = [
      {
        id: 1,
        groupname: 'and',
        createdAt: '2017-08-13T11:35:38.967Z',
        updatedAt: '2017-08-13T11:35:38.967Z',
        UserGroups: {
          createdAt: '2017-08-07T09:20:20.283Z',
          updatedAt: '2017-08-07T09:20:20.283Z',
          groupId: 1,
          userId: 3
        }
      }
    ];
    const action = { type: GROUPS_RECEIVED, groups };
    const newState = groupReducer(initialState, action);

    expect(newState.groupList).toEqual(groups);
    expect(newState.appStatus).toEqual('ready');
  });
  it('should handle GROUPS_NOT_RECEIVED', () => {
    const action = { type: GROUPS_NOT_RECEIVED };
    const newState = groupReducer(initialState, action);

    expect(newState.groupList).toEqual([]);
    expect(newState.appStatus).toEqual('no groups');
  });
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
    const newState = groupReducer(initialState, action);

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
    const newState = groupReducer(initialState, action);

    expect(newState.list).toEqual(message);
    expect(newState.list.messagecreator).toEqual(message.messagecreator);
  });
  it('should handle ADD_USER', () => {
    const addUser = 'phemz1';
    const action = { type: ADD_USER, addUser };
    const newState = groupReducer(initialState, action);

    expect(newState.addUser).toEqual(addUser);
  });
  it('should return default state', () => {
    const action = { type: 'NO_ACTION' };
    const newState = groupReducer(initialState, action);

    expect(newState).toEqual(initialState);
    expect(newState.groupList).toEqual([]);
  });
});

