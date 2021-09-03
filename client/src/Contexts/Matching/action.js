import {
  REGISTER_MATCHING,
  PATCH_MATCHING,
  DELETE_MATCHING,
  GET_MATCHING_CUSTOMER,
  GET_MATCHING_LIST_DESIGNER,
  GET_MATCHINGHISTORY_LIST_CUSTOMER,
  GET_MATCHINGHISTORY_LIST_DESIGNER,
} from './constant';
import MatchingAPI from '../../Api/matching';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerMatching = (payload) => ({ type: REGISTER_MATCHING, payload });
export const patchMatching = (id, payload) => ({ type: PATCH_MATCHING, id, payload });
export const deleteMatching = (id) => ({ type: DELETE_MATCHING, id });
export const getMatchingByCustomerId = createPromiseThunk(
  GET_MATCHING_CUSTOMER,
  MatchingAPI.getMatchingByCustomerId,
);
export const getMatchingListByDesignerId = createPromiseThunk(
  GET_MATCHING_LIST_DESIGNER,
  MatchingAPI.getMatchingListByDesignerId,
);
export const getMatchingHistoryListByCustomerId = createPromiseThunk(
  GET_MATCHINGHISTORY_LIST_CUSTOMER,
  MatchingAPI.getMatchingHistoryListByCustomerId,
);
export const getMatchingHistoryListByDesignerId = createPromiseThunk(
  GET_MATCHINGHISTORY_LIST_DESIGNER,
  MatchingAPI.getMatchingHistoryListByDesignerId,
);
