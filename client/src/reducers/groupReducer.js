import { GROUPS_RECEIVED, GROUP_CREATE, GROUP_SELECTED, APPLICATION_STATE, GROUP_MESSAGES } from '../actions/types';

const initialState = {
  groupList: [],
  selectedGroup: null,
  groupMessages: [],
  appStatus: 'ready'
};

export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case GROUPS_RECEIVED:
      updated['groupList'] = action.groups;
      updated['appStatus'] = 'ready';
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

    default:
      return state;
  }
};
