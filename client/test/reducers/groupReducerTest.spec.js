import expect from 'expect';
import groupReducer from '../../src/reducers/groupReducer';
import { GROUP_CREATE } from '../../src/actions/types';

describe('Group Reducer', () => {
  const initialState = {
    groupList: [],
    selectedGroup: null,
    groupMessages: [],
    appStatus: 'ready'
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
});

