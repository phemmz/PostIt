import { GROUP_MESSAGES, SEND_MESSAGE } from '../actions/types';

const initialState = {
  groupMessages: [],
  list: {}
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
    case GROUP_MESSAGES:
      updated.groupMessages = action.messages;
      return updated;

    case SEND_MESSAGE:
      updated.list = action.message;
      return updated;

    default:
      return state;
  }
};
