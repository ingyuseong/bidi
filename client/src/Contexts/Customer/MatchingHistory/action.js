import {
  REGISTER_MATCHINGHISTORY,
  PATCH_MATCHINGHISTORY,
  DELETE_MATCHINGHISTORY,
  GET_MATCHINGHISTORY_LIST_CUSTOMER,
  GET_MATCHINGHISTORY_LIST_DESIGNER,
} from './constant';
import MatchingAPI from '../../../Api/matching';
import { createPromiseThunk } from '../../Common/asyncUtils';

export const registerMatchingHistory = (payload) => ({ type: REGISTER_MATCHINGHISTORY, payload });
export const patchMatchingHistory = (id, payload) => ({ type: PATCH_MATCHINGHISTORY, id, payload });
export const deleteMatchingHistory = (id) => ({ type: DELETE_MATCHINGHISTORY, id });
export const getMatchingHistoryListByCustomerId = createPromiseThunk(
  GET_MATCHINGHISTORY_LIST_CUSTOMER,
  MatchingAPI.getMatchingHistoryListByCustomerId,
);
export const getMatchingHistoryListByDesignerId = createPromiseThunk(
  GET_MATCHINGHISTORY_LIST_DESIGNER,
  MatchingAPI.getMatchingHistoryListByDesignerId,
);
