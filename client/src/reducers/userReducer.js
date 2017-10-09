import { GET_ALL_USERS, SEARCH_USER } from '../actions/types';

const initialState = {
  users: [],
  searchedUsers: [],
  meta: {}
};

export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case GET_ALL_USERS:
      updated.users = action.users;
      return updated;

    case SEARCH_USER:
      updated.searchedUsers = action.searchedUsers;
      return updated;

    default: return state;
  }
};
