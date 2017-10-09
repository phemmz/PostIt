import { GROUP_MESSAGES, SEND_MESSAGE, ADD_NOTIFICATION,
  CLEAR_NOTIFICATION, READ_STATUS,
  READ_LIST, NO_GROUP_MESSAGE, SET_GROUP_NAME } from '../actions/types';

const initialState = {
  groupMessages: [],
  notifications: [],
  readStatus: false,
  readList: [],
  groupName: 'Welcome'
};
/**
 * @description Group reducer takes the state and action and then returns
 * the state with groupList, selectedGroup, groupMessages and appStatus
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export default (state = initialState, action = {}) => {
  const updated = { ...state };
  switch (action.type) {
    case GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.messages
      };

    case NO_GROUP_MESSAGE:
      return {
        ...state,
        groupMessages: []
      };

    case SEND_MESSAGE:
      updated.groupMessages = [
        ...updated.groupMessages,
        action.message,
      ];
      return updated;

    case ADD_NOTIFICATION:
      updated.notifications = [...updated.notifications, action.notification];
      return updated;

    case CLEAR_NOTIFICATION:
      updated.notifications = [];
      return updated;

    case READ_STATUS:
      return { ...state, readStatus: true };

    case READ_LIST:
      return { ...state, readList: action.readList };

    case SET_GROUP_NAME:
      return { ...state, groupName: action.groupName };

    default:
      return state;
  }
};
