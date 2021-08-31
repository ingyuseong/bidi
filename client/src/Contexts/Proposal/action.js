import { GET_PROPOSAL_LIST } from './constant';
import ProposalAPI from '../../Api/proposal';
import { createPromiseThunk } from '../Common/asyncUtils';

export const getProposalList = createPromiseThunk(GET_PROPOSAL_LIST, ProposalAPI.getProposalList);
