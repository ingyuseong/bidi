import {
  GET_STYLE_LIST,
  GET_STYLE_LIST_ERROR,
  GET_STYLE_LIST_SUCCESS,
  DELETE_STYLE,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(null),
};
const designerStyleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STYLE_LIST:
    case GET_STYLE_LIST_SUCCESS:
    case GET_STYLE_LIST_ERROR:
      return handleAsyncActions(GET_STYLE_LIST)(state, action);
    case DELETE_STYLE:
      return {
        ...state,
        data: state.data.filter((style) => {
          return style.id !== state.id;
        }),
      };
    default:
      return state;
  }
};
export default designerStyleReducer;
