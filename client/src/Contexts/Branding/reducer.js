import {
  GET_BRANDING_LIST_DESIGNER,
  GET_BRANDING_LIST_DESIGNER_SUCCESS,
  GET_BRANDING_LIST_DESIGNER_ERROR,
  REGISTER_BRANDING,
  PATCH_BRANDING,
  DELETE_BRANDING,
  GET_BRANDING_LIST,
  GET_BRANDING_LIST_ERROR,
  GET_BRANDING_LIST_SUCCESS,
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
    case REGISTER_BRANDING:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PATCH_BRANDING:
      return {
        ...state,
        data: state.data.map((branding) => {
          return branding.id === state.id ? { ...branding, ...action.payload } : branding;
        }),
      };
    case DELETE_BRANDING:
      return {
        ...state,
        data: state.data.filter((branding) => {
          return branding.id !== state.id;
        }),
      };
    case GET_BRANDING_LIST:
    case GET_BRANDING_LIST_SUCCESS:
    case GET_BRANDING_LIST_ERROR:
      return handleAsyncActions(GET_BRANDING_LIST)(state, action);
    default:
      return state;
  }
};
export default brandingReducer;
