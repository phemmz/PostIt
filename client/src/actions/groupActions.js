import axios from 'axios';
import { GROUP_CREATE, GROUPS_RECEIVED, GROUP_SELECTED, CURRENT_USER_RECEIVED, USER_RECEIVED, APPLICATION_STATE, GROUP_MESSAGES } from './types';

export function groupsReceived(groups) {
  return {
    type: GROUPS_RECEIVED,
    groups
  }
}

export function groupCreate(group) {
  return {
    type: GROUP_CREATE,
    group
  };
}

export function groupSelected(groupId) {
  return {
    type: GROUP_SELECTED,
    selectedGroup: groupId
  }
}

export function currentUserReceived(user) {
  return {
    type: CURRENT_USER_RECEIVED,
    user
  }
}

export function userReceived(user) {
  return {
    type: USER_RECEIVED,
    user
  }
}

export function fetchGroups(params) {
  return (dispatch) => {
    dispatch({
      type: APPLICATION_STATE,
      status: 'loading'
    })

    axios.get('/api/group', params)
      .then((response) => {
        const groups = response.data.results;
        dispatch({
          type: GROUPS_RECEIVED,
          groups
        })
      })
  }
}
export function groupMessages(groupId) {
  return (dispatch) => {
    axios.get(`api/group/${groupId}/messages`)
      .then((response) => {
        const groups = response.data.results;
        console.log(groups, 'group messgaes');
        dispatch({
          type: GROUP_MESSAGES,
          groups
        });
      });
  };
}
