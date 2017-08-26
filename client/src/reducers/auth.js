import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';
/**
 * Initial state
 */
const initialState = {
  isAuthenticated: false,
  user: {}
};
/**
 * Auth reducer takes the state and action and then returns the state
 * with isAuthenticated and the decoded token
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
};
