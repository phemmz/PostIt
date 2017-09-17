import axios from 'axios';
import { GET_ALL_USERS, SEARCH_USER } from './types';
/**
 * UserActions class
 */
export default class UserActions {

  /**
   * This action gets all the registered users
   * @returns {object} users
   */
  static getUsers() {
    return (dispatch) => {
      return axios.get('/api/v1/user')
        .then((response) => {
          const users = response.data.result;
          dispatch({
            type: GET_ALL_USERS,
            users
          });
        });
    };
  }
  /**
   * @param {*} searchKey
   * @param {*} offset
   * @param {*} perPage
   * @return {*} response
   */
  static searchUser(searchKey, offset, perPage) {
    return (dispatch) => {
      return axios.get(`api/v1/search/${searchKey}/${offset}/${perPage}`)
        .then((response) => {
          dispatch({
            type: SEARCH_USER,
            searchedUsers: response.data.searchedUsers
          });
          return response.data;
        });
    };
  }
}
