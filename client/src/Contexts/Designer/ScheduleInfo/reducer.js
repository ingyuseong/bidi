import {
  REGISTER_SCHEDULEINFO,
  REGISTER_SCHEDULEINFO_SUCCESS,
  REGISTER_SCHEDULEINFO_ERROR,
  GET_SCHEDULEINFO,
  GET_SCHEDULEINFO_SUCCESS,
  GET_SCHEDULEINFO_ERROR,
  PATCH_SCHEDULEINFO,
  DELETE_SCHEDULEINFO,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const scheduleInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SCHEDULEINFO:
    case REGISTER_SCHEDULEINFO_SUCCESS:
    case REGISTER_SCHEDULEINFO_ERROR:
      return handleAsyncActions(REGISTER_SCHEDULEINFO)(state, action);
    case GET_SCHEDULEINFO:
    case GET_SCHEDULEINFO_SUCCESS:
    case GET_SCHEDULEINFO_ERROR:
      return handleAsyncActions(GET_SCHEDULEINFO)(state, action);
    case PATCH_SCHEDULEINFO:
      return {
        ...state,
        data: state.data.map((scheduleInfo) => {
          return scheduleInfo.id === state.id
            ? { ...scheduleInfo, ...action.payload }
            : scheduleInfo;
        }),
      };
    case DELETE_SCHEDULEINFO:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
export default scheduleInfoReducer;
