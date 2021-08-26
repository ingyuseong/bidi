import { GET_PROPOSAL_LIST, GET_PROPOSAL_LIST_SUCCESS, GET_PROPOSAL_LIST_ERROR } from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial(),
};
const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROPOSAL_LIST:
    case GET_PROPOSAL_LIST_SUCCESS:
    case GET_PROPOSAL_LIST_ERROR:
      return handleAsyncActions(GET_PROPOSAL_LIST)(state, action);
    default:
      return state;
  }
};
export default proposalReducer;
