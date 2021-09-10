import {
  REGISTER_STYLESCRAP,
  DELETE_STYLESCRAP,
  GET_STYLESCRAP_LIST,
  GET_STYLESCRAP_LIST_SUCCESS,
  GET_STYLESCRAP_LIST_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(null),
};
const designerStyleScrapReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STYLESCRAP:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case DELETE_STYLESCRAP:
      return {
        ...state,
        data: state.data.filter((style) => {
          return style.id !== action.id;
        }),
      };
    case GET_STYLESCRAP_LIST:
    case GET_STYLESCRAP_LIST_SUCCESS:
    case GET_STYLESCRAP_LIST_ERROR:
      return handleAsyncActions(GET_STYLESCRAP_LIST)(state, action);
    default:
      return state;
  }
};
export default designerStyleScrapReducer;
