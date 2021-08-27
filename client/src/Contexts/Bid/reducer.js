import { REGISTER_BID, REGISTER_BID_SUCCESS, REGISTER_BID_ERROR } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(),
};
const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BID:
    case REGISTER_BID_SUCCESS:
    case REGISTER_BID_ERROR:
      return handleAsyncActions(REGISTER_BID)(state, action);
    default:
      return state;
  }
};
export default bidReducer;
