import { SERVER_URL } from '../Lib/constant';

export const API = async (url, method, body) => {
  return await fetch(SERVER_URL + url, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method,
    body,
  })
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else if (response.status == 404) {
        return null;
      } else {
        throw new Error(false);
      }
    })
    .then(({ data }) => data)
    .catch((error) => {
      return false;
    });
};

export const formAPI = async (url, method, body) => {
  return await fetch(SERVER_URL + url, {
    headers: {
      'content-type': 'multipart/form-data',
    },
    method,
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.json());
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
