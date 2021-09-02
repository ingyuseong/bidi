import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
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
    case GET_USER:
      return {
        ...state,
        data: action.payload,
      };
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
      return handleAsyncActions(GET_USER)(state, action);
    default:
      return state;
  }
};
export default userReducer;
