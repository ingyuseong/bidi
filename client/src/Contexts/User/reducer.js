import { REGISTER_USER } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
