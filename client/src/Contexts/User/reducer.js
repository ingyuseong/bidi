import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case REGISTER_USER_SUCCESS:
    case REGISTER_USER_ERROR:
      return handleAsyncActions(REGISTER_USER)(state, action);
    case CHECK_TOKEN:
    case CHECK_TOKEN_SUCCESS:
    case CHECK_TOKEN_ERROR:
      return handleAsyncActions(CHECK_TOKEN)(state, action);
    default:
      return state;
  }
};
export default userReducer;
