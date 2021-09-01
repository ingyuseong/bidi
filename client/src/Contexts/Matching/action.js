import {
  REGISTER_MATCHING,
  PATCH_MATCHING,
  DELETE_MATCHING,
  GET_MATCHING_LIST_DESIGNER,
  GET_MATCHING_LIST_CUSTOMER,
} from './constant';
import MatchingAPI from '../../Api/matching';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerMatching = (payload) => ({ type: REGISTER_MATCHING, payload });
export const patchMatching = (id, payload) => ({ type: PATCH_MATCHING, id, payload });
export const deleteMatching = (id) => ({ type: DELETE_MATCHING, id });
export const getMatchingListByDesignerId = createPromiseThunk(
  GET_MATCHING_LIST_DESIGNER,
  MatchingAPI.getMatchingListByDesignerId,
);
export const getMatchingListByCustomerId = createPromiseThunk(
  GET_MATCHING_LIST_CUSTOMER,
  MatchingAPI.getMatchingListByCustomerId,
);
