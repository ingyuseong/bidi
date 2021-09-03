import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/bid/register : 비드 등록 API
    
    [ 2. GET Methods ]
    GET /api/bid/:id               : 비드 정보 조회 API
    GET /api/bid/designer/:userId  : 디자이너 비드 목록 조회 API
    GET /api/bid/customer/:userId  : 유저 비드 목록 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/bid/canceled : 비드 취소 상태 수정 API
    PATCH /api/bid/:id      : 비드 수정 API

    [ 4. DELETE Methods]
    DELETE /api/bid/:id : 비드 삭제 API
*/

const BidAPI = {
  registerBid: async (body) => {
    return await API('/bid/register', 'post', JSON.stringify(body));
  },
  getBid: async () => {},
  getBidListByCustomerId: async (id) => {
    return await API(`/bid/customer/${id}`, 'get');
  },
  getBidListByDesignerId: async (id) => {
    return await API(`/bid/designer/${id}`, 'get');
  },
  patchBidCanceled: async (id, body) => {
    return await API(`/bid/canceled/${id}`, 'patch', JSON.stringify(body));
  },
  patchBid: async (id, body) => {
    return await API(`/bid/${id}`, 'patch', JSON.stringify(body));
  },
  deleteBid: async (id) => {
    return await API(`/bid/${id}`, 'delete');
  },
};
export default BidAPI;
