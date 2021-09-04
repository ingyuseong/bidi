import { GET_STYLE_LIST } from './constant';
import StyleAPI from '../../Api/style';
import { createPromiseThunk } from '../Common/asyncUtils';

export const getStyleListByDesignerId = createPromiseThunk(
  GET_STYLE_LIST,
  StyleAPI.getStyleListByDesignerId,
);
