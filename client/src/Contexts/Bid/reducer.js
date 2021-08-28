import { REGISTER_BID } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BID:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};
export default bidReducer;
