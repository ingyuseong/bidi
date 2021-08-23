import BidiStorage from './storage';
import { STORAGE_KEY } from './constant';

const checkType = async () => {
  const { type } = await BidiStorage.getData(STORAGE_KEY);
  switch (type) {
    case '일반 사용자':
      return 'user';
    case '디자이너':
      return 'designer';
    default:
      return false;
  }
};

const convertDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + '/' + month + '/' + day;
};

const dateFormating = (date) => {
  const update = new Date(date);
  return `${update.getFullYear()}.${
    update.getMonth('mm') < 10 ? '0' + update.getMonth('mm') : update.getMonth('mm')
  }.${update.getDate('dd') < 10 ? '0' + update.getDate('dd') : update.getDate('dd')}`;
};

const textLimiting = (description, count) => {
  if (description.length > count) {
    return description.substr(0, count);
  } else {
    return description;
  }
};

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('userImage', {
    name: body.userNickName,
    type: photo.type,
    uri: photo.uri.replace('file://', ''),
  });
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

export { checkType, convertDate, textLimiting, dateFormating, createFormData };
