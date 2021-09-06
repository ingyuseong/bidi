import {
  REGISTER_PROPOSAL,
  REGISTER_WITHFILE,
  PATCH_PROPOSAL,
  DELETE_PROPOSAL,
  GET_PROPOSAL,
  GET_PROPOSAL_ASYNC,
  GET_PROPOSAL_LIST,
} from './constant';
import ProposalAPI from '../../Api/proposal';
import { createPromiseThunk } from '../Common/asyncUtils';

// for Proposal only
export const registerProposal = createPromiseThunk(REGISTER_PROPOSAL, ProposalAPI.registerProposal);
export const registerWithFile = createPromiseThunk(REGISTER_WITHFILE, ProposalAPI.registerWithFile);
export const patchProposal = (id, payload) => ({ type: PATCH_PROPOSAL, id, payload });
export const deleteProposal = (id) => ({ type: DELETE_PROPOSAL, id });
export const getProposal = (payload) => ({ type: GET_PROPOSAL, payload });
export const getProposalAsync = createPromiseThunk(
  GET_PROPOSAL_ASYNC,
  ProposalAPI.getProposalByUserId,
);

// for Proposal List
export const getProposalList = createPromiseThunk(GET_PROPOSAL_LIST, ProposalAPI.getProposalList);
