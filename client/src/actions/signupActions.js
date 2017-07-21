import APIManager from '../utils/APIManager';

export function userSignupRequest(userData) {
  return dispatch => {
    return APIManager.post('/api/user/signup', userData, (err, res) => {
      
    });
  }
}