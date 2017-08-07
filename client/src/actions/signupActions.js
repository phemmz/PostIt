import axios from 'axios';

/**
 * SignupActions class
 */
export default class SignupActions {
  /**
   * @param {object} userData
   * @return {*} axios
   */
  static userSignupRequest(userData) {
    return () => {
      return axios.post('/api/user/signup', userData);
    };
  }
  /**
   * @param {string} identifier
   * @return {*} axios
   */
  static isUserExists(identifier) {
    return () => {
      return axios.get(`/api/user/${identifier}`);
    };
  }
}
