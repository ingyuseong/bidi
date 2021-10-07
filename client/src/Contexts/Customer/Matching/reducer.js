import {
  REGISTER_MATCHING,
  REGISTER_MATCHING_SUCCESS,
  REGISTER_MATCHING_ERROR,
  PATCH_MATCHING,
  PATCH_MATCHING_LIST,
  DELETE_MATCHING,
  DELETE_MATCHING_LIST,
  GET_MATCHING_CUSTOMER,
  GET_MATCHING_CUSTOMER_SUCCESS,
  GET_MATCHING_CUSTOMER_ERROR,
  GET_MATCHING_LIST_DESIGNER,
  GET_MATCHING_LIST_DESIGNER_SUCCESS,
  GET_MATCHING_LIST_DESIGNER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(null),
};
const customerMatchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_MATCHING:
      return {
        ...state,
        data: action.payload,
      };
    case PATCH_MATCHING:
      return {
        ...state,
        data: state.data.map((matching) => {
          return matching.id === state.id ? { ...matching, ...action.payload } : matching;
        }),
      };
    case PATCH_MATCHING_LIST:
      return {
        ...state,
        data: state.data.map((matching) => {
          return matching.id === state.id ? { ...matching, ...action.payload } : matching;
        }),
      };
    case DELETE_MATCHING:
      return {
        ...state,
        data: [],
      };
    case DELETE_MATCHING_LIST:
      return {
        ...state,
        data: state.data.filter((matching) => {
          return matching.id !== state.id;
        }),
      };
    case GET_MATCHING_CUSTOMER:
    case GET_MATCHING_CUSTOMER_SUCCESS:
    case GET_MATCHING_CUSTOMER_ERROR:
      return handleAsyncActions(GET_MATCHING_CUSTOMER)(state, action);
    case GET_MATCHING_LIST_DESIGNER:
    case GET_MATCHING_LIST_DESIGNER_SUCCESS:
    case GET_MATCHING_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_MATCHING_LIST_DESIGNER)(state, action);
    default:
      return state;
  }
};
export default customerMatchingReducer;
