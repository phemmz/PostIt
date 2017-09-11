import axios from 'axios';
/**
 * setAuthorizationToken
 * Sets Authorization on request headers if token is available
 * Deletes Authorization if token is false
 * The reason why JWT is used and attached to the header
 * is to prove that the sent data was actually created by an authentic source.
 * @param {*} token
 * @returns {*} header
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
