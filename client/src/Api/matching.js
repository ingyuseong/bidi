import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/matching/register         : 매칭 등록 API
    
    [ 2. GET Methods ]
    GET /api/matching/list                  : 전체 매칭 목록 조회 API
    GET /api/matching/:id                   : 매칭 정보 조회 API
    GET /api/matching/designer/:id          : 디자이너의 매칭 목록 조회 API
    GET /api/matching/customer/:id          : 유저의 매칭 목록 조회 API
    GET /api/matching/history/designer/:id  : 디자이너의 완료된 매칭 목록 조회 API
    GET /api/matching/history/customer/:id  : 유저의 완료된 매칭 목록 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/matching/time/:id     : 매칭 시간 정보 수정 API
    PATCH /api/matching/review/:id   : 매칭 리뷰 정보 수정 API
    PATCH /api/matching/star/:id     : 매칭 별점 정보 수정 API
    PATCH /api/matching/done/:id     : 매칭 종료 상태 수정 API
    PATCH /api/matching/cancel/:id   : 매칭 취소 상태 수정 API

    [ 4. DELETE Methods]
    DELETE /api/matching/:id : 매칭 정보 삭제 API
*/

const MatchingAPI = {
  registerMatching: async () => {},
  getMatchingList: async () => {},
  getMatching: async () => {},
  getMatchingByCustomerId: async (id) => {
    return await API(`/matching/customer/${id}`, 'get');
  },
  getMatchingListByDesignerId: async (id) => {
    return await API(`/matching/designer/${id}`, 'get');
  },
  getMatchingHistoryListByCustomerId: async (id) => {
    return await API(`/matching/history/customer/${id}`, 'get');
  },
  getMatchingHistoryListByDesignerId: async (id) => {
    return await API(`/matching/history/designer/${id}`, 'get');
  },
  patchMatchingTime: async () => {},
  patchMatchingReview: async (id, body) => {
    return await API(`/matching/review/${id}`, 'patch', JSON.stringify(body));
  },
  patchMatchingStar: async (id, body) => {
    return await API(`/matching/star/${id}`, 'patch', JSON.stringify(body));
  },
  patchMatchingCanceled: async () => {},
  deleteMatching: async () => {},
};
export default MatchingAPI;
