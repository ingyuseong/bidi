import { SERVER_URL } from '../Lib/constant';
import { createFormData } from '../Lib/utils';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';

export const createUserAPI = (photo, body) => {
  return fetch(SERVER_URL + '/user/register', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    body: createFormData(photo, body),
  })
    .then((response) => response.json())
    .then(async ({ data }) => {
      return [true, data];
    })
    .catch((error) => {
      return [false, 'error'];
    });
};
