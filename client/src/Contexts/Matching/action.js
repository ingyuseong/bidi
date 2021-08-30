import { GET_MATCHING_LIST_DESIGNER } from './constant';
import MatchingAPI from '../../Api/matching';
import { createPromiseThunk } from '../Common/asyncUtils';

export const getMatchingListByDesignerId = createPromiseThunk(
  GET_MATCHING_LIST_DESIGNER,
  MatchingAPI.getMatchingListByDesignerId,
);
