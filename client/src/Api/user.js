import { API, formAPI } from './common';

const UserAPI = {
  registerUser: async (body) => {
    return await formAPI('/user/register', 'post', body);
  },
  checkUser: async (profile) => {
    return await API(
      '/user/checkToken',
      'post',
      JSON.stringify({
        token: profile.id,
      }),
    );
  },
};
export default UserAPI;
