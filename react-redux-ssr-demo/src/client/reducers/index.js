import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import adminsReducer from './adminsReducer';
import authReducer from './authReducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer
});
