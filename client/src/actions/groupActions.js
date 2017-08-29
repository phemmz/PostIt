import axios from 'axios';
import { GROUP_CREATE, GROUPS_RECEIVED, GROUPS_NOT_RECEIVED, GROUP_SELECTED, APPLICATION_STATE, ADD_USER } from './types';
/**
 * GroupActions class
 */
export default class GroupActions {
  /**
   * groupCreate() creates a group
   * @param {object} group
   * @returns {object} type, group
   */
  static groupCreate(group) {
    return (dispatch) => {
      return axios.post('/api/group', group)
      .then(() => {
        dispatch({
          type: GROUP_CREATE,
          group
        });
      });
    };
  }
  /**
   * groupSelected action saves the groupId of the group clicked to the state
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
   * @description fetchGroups actions makes an api call to fetch groups a user belongs to
   * @returns {object} type,status,groups
   */
  static fetchGroups() {
    return (dispatch) => {
      /**
       * Dispatches the APPLICATION_STATE immediately fetchGroup action is fired
       * sets status to loading just before the api call is made
       */
      dispatch({
        type: APPLICATION_STATE,
        status: 'loading'
      });
      return axios.get('/api/group')
        .then((response) => {
          const groups = response.data.results;
          /**
           * Dispatches GROUPS_RECEIVED if call to api is successful
           */
          dispatch({
            type: GROUPS_RECEIVED,
            groups
          });
        })
        .catch(() => {
          /**
           * Dispatches GROUPS_NOT_RECEIVED if call to api is not successful
           */
          dispatch({
            type: GROUPS_NOT_RECEIVED
          });
        });
    };
  }
  /**
   * @description Adds user to a group
   * @param {integer} groupId
   * @param {object} userAdded
   * @returns {object} type, addUser
   */
  static addUser(groupId, userAdded) {
    return (dispatch) => {
      return axios.post(`api/group/${groupId}/user`, userAdded)
        .then((response) => {
          dispatch({
            type: ADD_USER,
            addUser: response.data.results
          });
        });
    };
  }
}
