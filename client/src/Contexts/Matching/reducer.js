import {
  GET_MATCHING_LIST_DESIGNER,
  GET_MATCHING_LIST_DESIGNER_SUCCESS,
  GET_MATCHING_LIST_DESIGNER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const matchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHING_LIST_DESIGNER:
    case GET_MATCHING_LIST_DESIGNER_SUCCESS:
    case GET_MATCHING_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_MATCHING_LIST_DESIGNER)(state, action);
    default:
      return state;
  }
};
export default matchingReducer;
