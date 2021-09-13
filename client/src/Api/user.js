import { API, formAPI } from './common';

const UserAPI = {
  registerUser: async (body) => {
    return await formAPI('/user/register', 'post', body);
  },
  checkToken: async (token) => {
    return await API('/user/checkToken', 'post', JSON.stringify({ token }));
  },
  patchUser: async (id, body) => {
    return await formAPI(`/user/${id}`, 'patch', body);
  },
  deleteUser: async (id) => {
    return await API(`/user/${id}`, 'delete');
  },
};
export default UserAPI;
