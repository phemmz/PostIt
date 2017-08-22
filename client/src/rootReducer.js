import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groupReducer from './reducers/groupReducer';
import userReducer from './reducers/userReducer';


export default combineReducers({
  auth,
  groupReducer,
  userReducer
});
