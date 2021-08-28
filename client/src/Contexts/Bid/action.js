import { REGISTER_BID, GET_BID_LIST_DESIGNER } from './constant';
import BidAPI from '../../Api/bid';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerBid = (payload) => ({ type: REGISTER_BID, payload });
export const getBidListByDesignerId = createPromiseThunk(
  GET_BID_LIST_DESIGNER,
  BidAPI.getBidListByDesignerId,
);
