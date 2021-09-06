import { API, formAPI } from './common';

const UserAPI = {
  registerUser: async (body) => {
    return await formAPI('/user/register', 'post', JSON.stringify(body));
  },
  checkToken: async (token) => {
    return await API('/user/checkToken', 'post', JSON.stringify({ token }));
  },
};
export default UserAPI;
