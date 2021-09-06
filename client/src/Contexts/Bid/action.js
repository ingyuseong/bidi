import { GET_BID_LIST_DESIGNER, PATCH_BID, DELETE_BID } from './constant';
import BidAPI from '../../Api/bid';
import { createPromiseThunk } from '../Common/asyncUtils';

export const patchBid = (id, payload) => ({ type: PATCH_BID, id, payload });
export const deleteBid = (id) => ({ type: DELETE_BID, id });
export const getBidListByDesignerId = createPromiseThunk(
  GET_BID_LIST_DESIGNER,
  BidAPI.getBidListByDesignerId,
);
