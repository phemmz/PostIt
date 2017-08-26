import { GET_ALL_USERS } from '../actions/types';

const initialState = {
  users: []
};

export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case GET_ALL_USERS:
      updated.users = action.users;
      return updated;

    default: return state;
  }
};
