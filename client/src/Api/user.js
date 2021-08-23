import { SERVER_URL } from '../Lib/constant';
import { createFormData } from '../Lib/utils';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';

export const createUserAPI = async (photo, body) => {
  await fetch(SERVER_URL + '/user/register', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    body: createFormData(photo, body),
  })
    .then((response) => response.json())
    .then(async ({ data }) => {
      console.log(data);
      return [true, data];
    })
    .catch((error) => {
      console.error(error);
      return [false, 'error'];
    });
};
