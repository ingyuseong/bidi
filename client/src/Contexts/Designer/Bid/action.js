import {
  REGISTER_BID,
  PATCH_BID,
  DELETE_BID,
  GET_BID_LIST_CUSTOMER,
  GET_BID_LIST_DESIGNER,
} from './constant';

import BidAPI from '../../../Api/bid';
import { createPromiseThunk } from '../../Common/asyncUtils';

export const patchBid = (id, payload) => ({ type: PATCH_BID, id, payload });
export const deleteBid = (id) => ({ type: DELETE_BID, id });

export const getBidListByCustomerId = createPromiseThunk(
  GET_BID_LIST_CUSTOMER,
  BidAPI.getBidListByCustomerId,
);
export const getBidListByDesignerId = createPromiseThunk(
  GET_BID_LIST_DESIGNER,
  BidAPI.getBidListByDesignerId,
);
