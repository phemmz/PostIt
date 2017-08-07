import { GROUPS_RECEIVED, GROUPS_NOT_RECEIVED, GROUP_CREATE, GROUP_SELECTED, APPLICATION_STATE, GROUP_MESSAGES, ADD_USER } from '../actions/types';

const initialState = {
  groupList: [],
  selectedGroup: null,
  groupMessages: [],
  appStatus: 'ready'
};
/**
 * Group reducer takes the state and action and then returns the state
 * with groupList, selectedGroup, groupMessages and appStatus
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case GROUPS_RECEIVED:
      updated['groupList'] = action.groups;
      updated['appStatus'] = 'ready';
      return updated;

    case GROUPS_NOT_RECEIVED:
      updated['appStatus'] = 'no groups';
      return updated;

    case GROUP_CREATE:
      const updatedList = Object.assign([], updated['groupList']);
      updatedList.push(action.group);
      updated['groupList'] = updatedList;
      return updated;

    case GROUP_SELECTED:
      updated['selectedGroup'] = action.selectedGroup;
      return updated;

    case APPLICATION_STATE:
      updated['appStatus'] = action.status;
      return updated;

    case GROUP_MESSAGES:
      updated['groupMessages'] = action.groups;
      return updated;

    case ADD_USER:
      updated['addUser'] = action.addUser;
      return updated;

    default:
      return state;
  }
};
