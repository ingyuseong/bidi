import {
  REGISTER_PROPOSAL,
  REGISTER_PROPOSAL_SUCCESS,
  REGISTER_PROPOSAL_ERROR,
  REGISTER_WITHFILE,
  REGISTER_WITHFILE_SUCCESS,
  REGISTER_WITHFILE_ERROR,
  GET_PROPOSAL,
  GET_PROPOSAL_LIST,
  GET_PROPOSAL_LIST_SUCCESS,
  GET_PROPOSAL_LIST_ERROR,
} from './constant';
import { reducerUtils, handleAsyncActions } from '../Common/asyncUtils';
const initialState = {
  ...reducerUtils.initial([]),
};
const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PROPOSAL:
    case REGISTER_PROPOSAL_SUCCESS:
    case REGISTER_PROPOSAL_ERROR:
      return handleAsyncActions(REGISTER_PROPOSAL)(state, action);
    case REGISTER_WITHFILE:
    case REGISTER_WITHFILE_SUCCESS:
    case REGISTER_WITHFILE_ERROR:
      return handleAsyncActions(GET_PROPOSAL_LIST)(state, action);
    case GET_PROPOSAL:
      return {
        ...state,
        data: action.payload,
      };
    case GET_PROPOSAL_LIST:
    case GET_PROPOSAL_LIST_SUCCESS:
    case GET_PROPOSAL_LIST_ERROR:
      return handleAsyncActions(GET_PROPOSAL_LIST)(state, action);
    default:
      return state;
  }
};
export default proposalReducer;
