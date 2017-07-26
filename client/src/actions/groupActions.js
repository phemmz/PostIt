import axios from 'axios';

export function groupCreate(group) {
  return (dispatch) => {
    return axios.post('api/group', group);
  };
}
