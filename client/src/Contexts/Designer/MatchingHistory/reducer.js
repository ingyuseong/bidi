import {
  REGISTER_MATCHINGHISTORY,
  PATCH_MATCHINGHISTORY,
  DELETE_MATCHINGHISTORY,
  GET_MATCHINGHISTORY_LIST_CUSTOMER,
  GET_MATCHINGHISTORY_LIST_CUSTOMER_SUCCESS,
  GET_MATCHINGHISTORY_LIST_CUSTOMER_ERROR,
  GET_MATCHINGHISTORY_LIST_DESIGNER,
  GET_MATCHINGHISTORY_LIST_DESIGNER_SUCCESS,
  GET_MATCHINGHISTORY_LIST_DESIGNER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(null),
};
const matchingHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_MATCHINGHISTORY:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PATCH_MATCHINGHISTORY:
      return {
        ...state,
        data: state.data.map((matching) => {
          return matching.id === state.id ? { ...matching, ...action.payload } : matching;
        }),
      };
    case DELETE_MATCHINGHISTORY:
      return {
        ...state,
        data: state.data.filter((matching) => {
          return matching.id !== state.id;
        }),
      };
    case GET_MATCHINGHISTORY_LIST_DESIGNER:
    case GET_MATCHINGHISTORY_LIST_DESIGNER_SUCCESS:
    case GET_MATCHINGHISTORY_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_MATCHINGHISTORY_LIST_DESIGNER)(state, action);
    case GET_MATCHINGHISTORY_LIST_CUSTOMER:
    case GET_MATCHINGHISTORY_LIST_CUSTOMER_SUCCESS:
    case GET_MATCHINGHISTORY_LIST_CUSTOMER_ERROR:
      return handleAsyncActions(GET_MATCHINGHISTORY_LIST_CUSTOMER)(state, action);
    default:
      return state;
  }
};
export default matchingHistoryReducer;
