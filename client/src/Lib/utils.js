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
  return date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDay();
};

export { checkType, convertDate };
