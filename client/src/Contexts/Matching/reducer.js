import {
  REGISTER_MATCHING,
  PATCH_MATCHING,
  DELETE_MATCHING,
  GET_MATCHING_LIST_DESIGNER,
  GET_MATCHING_LIST_DESIGNER_SUCCESS,
  GET_MATCHING_LIST_DESIGNER_ERROR,
  GET_MATCHING_LIST_CUSTOMER,
  GET_MATCHING_LIST_CUSTOMER_SUCCESS,
  GET_MATCHING_LIST_CUSTOMER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const matchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_MATCHING:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PATCH_MATCHING:
      return {
        ...state,
        data: state.data.map((matching) => {
          return matching.id === state.id ? { ...matching, ...action.payload } : matching;
        }),
      };
    case DELETE_MATCHING:
      return {
        ...state,
        data: state.data.filter((matching) => {
          return matching.id !== state.id;
        }),
      };
    case GET_MATCHING_LIST_DESIGNER:
    case GET_MATCHING_LIST_DESIGNER_SUCCESS:
    case GET_MATCHING_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_MATCHING_LIST_DESIGNER)(state, action);
    case GET_MATCHING_LIST_CUSTOMER:
    case GET_MATCHING_LIST_CUSTOMER_SUCCESS:
    case GET_MATCHING_LIST_CUSTOMER_ERROR:
      return handleAsyncActions(GET_MATCHING_LIST_CUSTOMER)(state, action);
    default:
      return state;
  }
};
export default matchingReducer;
