import APIManager from '../utils/APIManager.js';

export function userSignupRequest(userData) {
	return dispatch => {
		return APIManager.post('/api/user/signup', userData);
	}
}