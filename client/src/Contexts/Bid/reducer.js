import {
  REGISTER_BID,
  PATCH_BID,
  DELETE_BID,
  GET_BID_LIST_DESIGNER,
  GET_BID_LIST_DESIGNER_SUCCESS,
  GET_BID_LIST_DESIGNER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BID:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PATCH_BID:
      return {
        ...state,
        data: state.data.map((bid) => {
          return bid.id === state.id ? { ...bid, ...action.payload } : bid;
        }),
      };
    case DELETE_BID:
      return {
        ...state,
        data: state.data.filter((bid) => {
          return bid.id !== state.id;
        }),
      };
    case GET_BID_LIST_DESIGNER:
    case GET_BID_LIST_DESIGNER_SUCCESS:
    case GET_BID_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_BID_LIST_DESIGNER)(state, action);
    default:
      return state;
  }
};
export default bidReducer;
