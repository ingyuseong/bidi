import {
  REGISTER_SCHEDULEINFO,
  GET_SCHEDULEINFO,
  PATCH_SCHEDULEINFO,
  DELETE_SCHEDULEINFO,
} from './constant';
import ScheduleInfoAPI from '../../../Api/scheduleInfo';
import { createPromiseThunk } from '../../Common/asyncUtils';

// for Proposal only
export const registerProposal = createPromiseThunk(
  REGISTER_SCHEDULEINFO,
  ScheduleInfoAPI.registerScheduleInfo,
);
export const getScheduleInfoByDesignerId = createPromiseThunk(
  GET_SCHEDULEINFO,
  ScheduleInfoAPI.getScheduleInfoByDesignerId,
);
export const patchProposal = (id, payload) => ({ type: PATCH_SCHEDULEINFO, id, payload });
export const deleteProposal = (id) => ({ type: DELETE_SCHEDULEINFO, id });
