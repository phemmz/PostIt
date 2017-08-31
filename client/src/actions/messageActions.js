import axios from 'axios';
import { GROUP_MESSAGES, SEND_MESSAGE, ADD_NOTIFICATION, CLEAR_NOTIFICATION, READ_STATUS, READ_LIST } from './types';
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
  /**
   * Add notification
   * @param {string} notification
   * @returns {object} type, groups
   */
  static addNotification(notification) {
    return (dispatch) => {
      dispatch({
        type: ADD_NOTIFICATION,
        notification
      });
    };
  }
  /**
   * Clears notification
   * @returns {*} void
   */
  static clearNotification() {
    return (dispatch) => {
      dispatch({
        type: CLEAR_NOTIFICATION
      });
    };
  }
  /**
   * updateReadStatus
   * @param {*} groupId
   * @return {*} void
   */
  static updateReadStatus(groupId) {
    return (dispatch) => {
      return axios.post(`api/group/${groupId}/readStatus`)
        .then((response) => {
          dispatch({
            type: READ_STATUS
          });
          return response.confirmation;
        });
    };
  }
  /**
   * readList
   * @param {*} groupId
   * @return {*} void
   */
  static readList(groupId) {
    return (dispatch) => {
      return axios.get(`api/group/${groupId}/readStatus`)
        .then((response) => {
          dispatch({
            type: READ_LIST,
            readList: response.data.uniqueList
          });
          return response.data.uniqueList;
        });
    };
  }
}
