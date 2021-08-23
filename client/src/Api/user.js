import { SERVER_URL } from '../Lib/constant';
import { createFormData } from '../Lib/utils';

const UserAPI = {
  createUserAPI: async (photo, body) => {
    try {
      return await fetch(SERVER_URL + '/user/register', {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: createFormData(photo, body),
      })
        .then((result) => result.json())
        .then((result) => {
          return [true, result.data];
        });
    } catch (error) {
      return [false, 'error'];
    }
  },
  checkUser: async (profile) => {
    try {
      return await fetch(SERVER_URL + '/user/checkToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          token: profile.id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          return [true, result.data];
        });
    } catch (error) {
      return [false, 'error'];
    }
  },
};
export default UserAPI;
