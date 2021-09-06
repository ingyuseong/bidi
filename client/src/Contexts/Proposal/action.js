import { REGISTER_PROPOSAL, REGISTER_WITHFILE, GET_PROPOSAL, GET_PROPOSAL_LIST } from './constant';
import ProposalAPI from '../../Api/proposal';
import { createPromiseThunk } from '../Common/asyncUtils';

// for Proposal only
export const registerProposal = createPromiseThunk(REGISTER_PROPOSAL, ProposalAPI.registerProposal);
export const registerWithFile = createPromiseThunk(REGISTER_WITHFILE, ProposalAPI.registerWithFile);
export const getProposal = (payload) => ({ type: GET_PROPOSAL, payload });

// for Proposal List
export const getProposalList = createPromiseThunk(GET_PROPOSAL_LIST, ProposalAPI.getProposalList);
