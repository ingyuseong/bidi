import { REGISTER_USER } from './constant';
import { reducerUtils } from '../Common/asyncUtils';
const initialState = {
  userInfo: reducerUtils.initial(),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      console.log(action.payload);
      return {
        ...state,
        userInfo: reducerUtils.success(action.payload),
      };
    default:
      return state;
  }
};
export default userReducer;
