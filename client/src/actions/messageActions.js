import axios from 'axios';
import { GROUP_MESSAGES, SEND_MESSAGE } from './types';
/**
 * MessageActions class
 */
export default class MessageActions {
  /**
   * Gets the messages in a group
   * @param {integer} groupId
   * @returns {object} type, groups
   */
  static groupMessages(groupId) {
    return (dispatch) => {
      return axios.get(`api/group/${groupId}/messages`)
        .then((response) => {
          const messages = response.data.results;
          dispatch({
            type: GROUP_MESSAGES,
            messages
          });
          return messages;
        });
    };
  }
  /**
   * @description postMessage is the action that sends
   * a message to a particular group
   * @param {*} groupId
   * @param {*} message
   * @return {*} message
   */
  static postMessage(groupId, message) {
    return (dispatch) => {
      return axios.post(`api/group/${groupId}/message`, message)
        .then((response) => {
          dispatch({
            type: SEND_MESSAGE,
            message: response.data.results
          });
          return response.data.results;
        });
    };
  }
}
