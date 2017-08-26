import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groupReducer from './reducers/groupReducer';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';


export default combineReducers({
  auth,
  groupReducer,
  messageReducer,
  userReducer
});
