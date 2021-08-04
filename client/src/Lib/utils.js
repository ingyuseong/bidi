import BidiStorage from './storage';
import { STORAGE_KEY } from './constant';

const checkType = async () => {
  const { type } = await BidiStorage.getData(STORAGE_KEY);
  if (type == '일반 사용자') {
    return 'user';
  }
  return 'designer';
};

export { checkType };
