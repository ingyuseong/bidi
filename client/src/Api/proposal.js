import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/proposal/register         : 제안서 등록 API
    POST /api/proposal/registerWithFile : 제안서 등록 API with Image File
    
    [ 2. GET Methods ]
    GET /api/proposal/list          : 전체 제안서 목록 조회 API
    GET /api/proposal/:id           : 제안서 정보 조회 API
    GET /api/proposal/user/:userId  : 유저 ID로 제안서 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/proposal/:id           : 제안서 정보 수정 API
    PATCH /api/proposal/matching/:id  : 제안서 매칭여부 수정 API

    [ 4. DELETE Methods]
    DELETE /api/proposal/:id : 제안서 정보 삭제 API
*/

const ProposalAPI = {
  registerProposal: async (body) => {
    return await API('/proposal/register', 'post', JSON.stringify(body));
  },
  registerWithFile: async (body) => {
    return await formAPI('/proposal/registerWithFile', 'post', body);
  },
  getProposalList: async () => {
    return await API('/proposal/list', 'get');
  },
  getProposal: async (id) => {
    return await API(`/proposal/${id}`, 'get');
  },
  getProposalByUserId: async (id) => {
    return await API(`/proposal/user/${id}`, 'get');
  },
  patchProposal: async (body) => {},
  patchMatchingStatus: async (body) => {},
  deleteProposal: async (id) => {
    return await API(`/proposal/${id}`, 'delete');
  },
};
export default ProposalAPI;
