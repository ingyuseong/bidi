import {
  GET_BRANDING_LIST_DESIGNER,
  GET_BRANDING_LIST_DESIGNER_SUCCESS,
  GET_BRANDING_LIST_DESIGNER_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const brandingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDING_LIST_DESIGNER:
    case GET_BRANDING_LIST_DESIGNER_SUCCESS:
    case GET_BRANDING_LIST_DESIGNER_ERROR:
      return handleAsyncActions(GET_BRANDING_LIST_DESIGNER)(state, action);
    default:
      return state;
  }
};
export default brandingReducer;
