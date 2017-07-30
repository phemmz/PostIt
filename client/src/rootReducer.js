import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import groupReducer from './reducers/groupReducer';
import userReducer from './reducers/userReducer';


export default combineReducers({
  flashMessages,
  auth,
  groupReducer,
  userReducer
});
