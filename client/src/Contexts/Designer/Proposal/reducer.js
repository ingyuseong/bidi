import {
  REGISTER_PROPOSAL,
  REGISTER_PROPOSAL_SUCCESS,
  REGISTER_PROPOSAL_ERROR,
  REGISTER_WITHFILE,
  REGISTER_WITHFILE_SUCCESS,
  REGISTER_WITHFILE_ERROR,
  GET_PROPOSAL,
  GET_PROPOSAL_ASYNC,
  GET_PROPOSAL_ASYNC_SUCCESS,
  GET_PROPOSAL_ASYNC_ERROR,
  GET_PROPOSAL_LIST,
  GET_PROPOSAL_LIST_SUCCESS,
  GET_PROPOSAL_LIST_ERROR,
  PATCH_PROPOSAL,
  DELETE_PROPOSAL,
  DELETE_PROPOSAL_LIST,
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
    case PATCH_PROPOSAL:
      return {
        ...state,
        data: state.data.map((proposal) => {
          return proposal.id === state.id ? { ...proposal, ...action.payload } : proposal;
        }),
      };
    case DELETE_PROPOSAL:
      return {
        ...state,
        data: [],
      };
    case DELETE_PROPOSAL_LIST:
      return {
        ...state,
        data: state.data.filter((proposal) => {
          return proposal.id !== state.id;
        }),
      };
    case GET_PROPOSAL:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case GET_PROPOSAL_ASYNC:
    case GET_PROPOSAL_ASYNC_SUCCESS:
    case GET_PROPOSAL_ASYNC_ERROR:
      return handleAsyncActions(GET_PROPOSAL_ASYNC)(state, action);
    case GET_PROPOSAL_LIST:
    case GET_PROPOSAL_LIST_SUCCESS:
    case GET_PROPOSAL_LIST_ERROR:
      return handleAsyncActions(GET_PROPOSAL_LIST)(state, action);
    default:
      return state;
  }
};
export default proposalReducer;
