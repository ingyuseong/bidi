import { GET_STYLE_LIST, GET_STYLE_LIST_ERROR, GET_STYLE_LIST_SUCCESS } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const styleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STYLE_LIST:
    case GET_STYLE_LIST_SUCCESS:
    case GET_STYLE_LIST_ERROR:
      return handleAsyncActions(GET_STYLE_LIST)(state, action);
    default:
      return state;
  }
};
export default styleReducer;
