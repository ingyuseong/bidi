import { REGISTER_BID } from './constant';
import BidAPI from '../../Api/bid';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerBid = createPromiseThunk(REGISTER_BID, BidAPI.registerBid);
