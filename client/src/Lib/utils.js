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

const textLimiting = (description, count) => {
  if (description.length > count) {
    return description.substr(0, count) + '..';
  } else {
    return description;
  }
};

export { checkType, convertDate, textLimiting };
