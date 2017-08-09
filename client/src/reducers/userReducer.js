import { GET_ALL_USERS, USER_RECEIVED } from '../actions/types';

const initialState = {
  usersMap: {},
  users: []
};

export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  const updatedUsersMap = Object.assign([], updated.usersMap);
  switch (action.type) {
    case GET_ALL_USERS:
      updated['users'] = action.users;
      return updated;

    case USER_RECEIVED:
      updatedUsersMap[action.user.username] = action.user;
      updated.usersMap = updatedUsersMap;
      return updated;

    default: return state;
  }
};
