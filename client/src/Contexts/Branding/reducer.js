import { GET_BRANDING_LIST, GET_BRANDING_LIST_ERROR, GET_BRANDING_LIST_SUCCESS } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(),
};
const brandingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDING_LIST:
    case GET_BRANDING_LIST_SUCCESS:
    case GET_BRANDING_LIST_ERROR:
      return handleAsyncActions(GET_BRANDING_LIST)(state, action);
    default:
      return state;
  }
};
export default brandingReducer;
