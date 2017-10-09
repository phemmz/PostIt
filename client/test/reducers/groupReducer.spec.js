import expect from 'expect';
import groupReducer from '../../src/reducers/groupReducer';
import { GROUP_CREATE, GROUP_SELECTED, GROUPS_RECEIVED,
  GROUPS_NOT_RECEIVED, APPLICATION_STATE,
  ADD_USER, GROUP_MEMBERS } from '../../src/actions/types';
import { initialGroupState, group, groups, user } from
  '../__mockData__/dummyData';

describe('Group Reducer', () => {
  it('should handle GROUP_CREATE for creating a group', () => {
    const action = { type: GROUP_CREATE, group };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.groupCreated).toEqual([group]);
  });

  it(`should set the groupId of the group
   selected to the state when passed GROUP_SELECTED`, () => {
    const selectedGroup = {
      id: group.groupId
    };

    const action = { type: GROUP_SELECTED, selectedGroup };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.selectedGroup).toEqual(selectedGroup);
  });

  it('should handle APPLICATION_STATE', () => {
    const action = { type: APPLICATION_STATE, status: 'loading' };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.appStatus).toEqual('loading');
  });

  it('should handle GROUPS_RECEIVED for user with groups', () => {
    const action = { type: GROUPS_RECEIVED, groups };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.groupList).toEqual(groups);
    expect(newState.appStatus).toEqual('ready');
  });

  it('should handle GROUPS_NOT_RECEIVED for user with no groups', () => {
    const action = { type: GROUPS_NOT_RECEIVED };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.groupList).toEqual(undefined);
    expect(newState.appStatus).toEqual('no groups');
  });

  it('should handle ADD_USER for adding user to a group', () => {
    const addUser = user[0].username;
    const action = { type: ADD_USER, addUser };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.addUser).toEqual(addUser);
  });

  it('should return default state for invalid action type ', () => {
    const action = { type: 'NO_ACTION' };
    const newState = groupReducer(initialGroupState, action);

    expect(newState).toEqual(initialGroupState);
    expect(newState.groupList).toEqual([]);
  });

  it('should handle GROUP_MEMBERS for getting members in a group', () => {
    const groupMembers = user;
    const action = { type: GROUP_MEMBERS, groupMembers };
    const newState = groupReducer(initialGroupState, action);

    expect(newState.groupMembers).toEqual(groupMembers);
  });
});

