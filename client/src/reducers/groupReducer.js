import { GROUPS_RECEIVED, GROUPS_NOT_RECEIVED,
   GROUP_CREATE, GROUP_SELECTED,
    APPLICATION_STATE, ADD_USER, GROUP_MEMBERS } from '../actions/types';

const initialState = {
  groupList: [],
  selectedGroup: null,
  appStatus: 'ready',
  groupMembers: [],
  groupCreated: []
};
/**
 * @description Group reducer takes the state and action and then
 * returns the state with groupList, selectedGroup, groupMessages and appStatus
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export default (state = initialState, action = {}) => {
  const updated = { ...state };
  switch (action.type) {
    case GROUPS_RECEIVED:
      return { ...state, groupList: action.groups, appStatus: 'ready' };

    case GROUPS_NOT_RECEIVED:
      return { ...state, groupList: action.groups, appStatus: 'no groups' };

    case GROUP_CREATE:
      updated.groupCreated = [...updated.groupCreated, action.group];
      return updated;

    case GROUP_SELECTED:
      return { ...state, selectedGroup: action.selectedGroup };

    case APPLICATION_STATE:
      return { ...state, appStatus: action.status };

    case ADD_USER:
      return { ...state, addUser: action.addUser };

    case GROUP_MEMBERS:
      return { ...state, groupMembers: action.groupMembers };

    default:
      return state;
  }
};
