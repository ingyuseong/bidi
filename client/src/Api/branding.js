import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/branding/register : 포트폴리오 등록 API
    
    [ 2. GET Methods ]
    GET /api/branding/list               : 전체 포트폴리오 목록 조회 (메인으로 설정된 포트폴리오 only)
    GET /api/branding/:id                : 특정 포트폴리오 정보 조회
    GET /api/branding/designer/:id       : 유저의 전체 포트폴리오 목록 조회
    GET /api/branding/main/designer/:id  : 유저의 메인 포트폴리오 정보 조회

    [ 3. PATCH Methods ]
    PATCH /api/branding/main         : 메인 포트폴리오 수정(user_id, branding_id)
    PATCH /api/branding/:brandingId  : 포트폴리오 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/branding/:brandingId : 포트폴리오 삭제 API
*/

const BrandingAPI = {
  registerBranding: async (body) => {
    return await API('/branding/register', 'post', JSON.stringify(body));
  },
  getBrandingList: async () => {
    return await API('/branding/list', 'get');
  },
  getBranding: async () => {},
  getBrandingListByDesignerId: async (id) => {
    return await API(`/branding/designer/${id}`, 'get');
  },
  getMainBrandingByDesignerId: async (id) => {
    return await API(`/branding/main/designer/${id}`, 'get');
  },
  patchMainBranding: async () => {},
  patchBranding: async (id, params) => {
    return await API(`/branding/${id}`, 'patch', JSON.stringify(params));
  },
  deleteBranding: async (id) => {
    return await API(`/branding/${id}`, 'delete');
  },
};
export default BrandingAPI;
