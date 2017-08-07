import axios from 'axios';
import { GROUP_CREATE, GROUPS_RECEIVED, GROUPS_NOT_RECEIVED, GROUP_SELECTED, CURRENT_USER_RECEIVED, USER_RECEIVED, APPLICATION_STATE, GROUP_MESSAGES, ADD_USER } from './types';
/**
 * GroupActions class
 */
export default class GroupActions {
  /**
   * groupsRecieved()
   * @param {object} groups
   * @returns {object} type, groups
   */
  static groupsReceived(groups) {
    return {
      type: GROUPS_RECEIVED,
      groups
    };
  }
  /**
   * groupCreate()
   * @param {object} group
   * @returns {object} type, group
   */
  static groupCreate(group) {
    return {
      type: GROUP_CREATE,
      group
    };
  }
  /**
   * groupSelected action saves the groupId of the group clicked on to the state
   * @param {integer} groupId
   * @returns {object} type, selectedGroup
   */
  static groupSelected(groupId) {
    return {
      type: GROUP_SELECTED,
      selectedGroup: groupId
    };
  }
  /**
   * @param {object} user
   * @return {object} type,user
   */
  static currentUserReceived(user) {
    return {
      type: CURRENT_USER_RECEIVED,
      user
    };
  }
  /**
   * @param {object} user
   * @return {object} user
   */
  static userReceived(user) {
    return {
      type: USER_RECEIVED,
      user
    };
  }
  /**
   * @param {*} params
   * @returns {object} type,status,groups
   */
  static fetchGroups(params) {
    return (dispatch) => {
      dispatch({
        type: APPLICATION_STATE,
        status: 'loading'
      });
      axios.get('/api/group', params)
        .then((response) => {
          const groups = response.data.results;
          dispatch({
            type: GROUPS_RECEIVED,
            groups
          });
        })
        .catch(() => {
          dispatch({
            type: GROUPS_NOT_RECEIVED
          });
        });
    };
  }
  /**
   * @param {integer} groupId
   * @returns {object} type, groups
   */
  static groupMessages(groupId) {
    return (dispatch) => {
      axios.get(`api/group/${groupId}/messages`)
        .then((response) => {
          const groups = response.data.results;
          dispatch({
            type: GROUP_MESSAGES,
            groups
          });
        });
    };
  }
  /**
   * @param {integer} groupId
   * @param {object} userAdded
   * @returns {object} type, addUser
   */
  static addUser(groupId, userAdded) {
    return (dispatch) => {
      axios.post(`api/group/${groupId}/user`, userAdded)
        .then((response) => {
          dispatch({
            type: ADD_USER,
            addUser: response.data.results
          });
        });
    };
  }
}
