import jwtDecode from 'jwt-decode';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, GET_ALL_USERS } from './types';
/**
 * AuthenticationActions class
 */
export default class AuthenticationActions {
  /**
   * The setCurrentUser action gets called from the
   * login action and it takes in the decoded token
   * @param {object} user
   * @returns {object} type, user
   */
  static setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
  }
  /**
   * logout signs the user out and removes the token from localstorage
   * @description logout action is a plain javascript object  describing how to change the state
   * @returns {*} dispatch
   */
  static logout() {
    return (dispatch) => {
      /**
       * this removes the token in the localstorage
       */
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(AuthenticationActions.setCurrentUser({}));
    };
  }
  /**
   * The login action takes the form data and calls axios.
   * It Gets the token from the server and saves it in localstorage
   * It also sets the header with the token
   * @param {object} data
   * @returns {*} axios
   */
  static login(data) {
    return (dispatch) => {
      return axios.post('api/user/signin', data).then((res) => {
        const token = res.data.token;
        /**
         * this saves the token in the localstorage as a key value object
         */
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        /**
         * the jwtDecode is a small browser library that helps
         * decoding JWTs token which are Base64Url encoded
         */
        dispatch(AuthenticationActions.setCurrentUser(jwtDecode(token)));
      });
    };
  }
  /**
   * This action gets all the registered users
   * @returns {object} users
   */
  static getUsers() {
    return (dispatch) => {
      axios.get('/api/user')
        .then((response) => {
          const users = response.data.result;
          dispatch({
            type: GET_ALL_USERS,
            users
          });
        });
    };
  }
}
