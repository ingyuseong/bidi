import { REGISTER_STYLESCRAP, GET_STYLESCRAP_LIST, DELETE_STYLESCRAP } from './constant';
import StyleScrapAPI from '../../../Api/styleScrap';
import { createPromiseThunk } from '../../Common/asyncUtils';

export const registerStyleScrap = (payload) => ({ type: REGISTER_STYLESCRAP, payload });
export const deleteStyleScrap = (id) => ({ type: DELETE_STYLESCRAP, id });
export const getStyleScrapList = createPromiseThunk(
  GET_STYLESCRAP_LIST,
  StyleScrapAPI.getStyleScrapList,
);
