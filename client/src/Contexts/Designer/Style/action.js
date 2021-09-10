import { GET_STYLE_LIST, PATCH_STYLE, DELETE_STYLE } from './constant';
import StyleAPI from '../../../Api/style';
import { createPromiseThunk } from '../../Common/asyncUtils';

export const patchStyle = (id, body) => ({ type: PATCH_STYLE, id, body });
export const deleteStyle = (id) => ({ type: DELETE_STYLE, id });
export const getStyleListByDesignerId = createPromiseThunk(
  GET_STYLE_LIST,
  StyleAPI.getStyleListByDesignerId,
);
