import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/styleScrap/register   : 스타일스크랩 등록 API

    [ 2. GET Methods ]
    GET /api/styleScarp/user/:id   : 유저의 스타일스크랩 목록 조회 API

    [ 3. PATCH Methods ]
    //

    [ 4. DELETE Methods]
    DELETE /api/styleScrap/delete : 스타일스크랩 삭제 API
*/

const StyleScrapAPI = {
  registerStyleScrap: async (body) => {
    return await API('/styleScrap/register', 'post', JSON.stringify(body));
  },
  getStyleScrapList: async (id) => {
    return await API(`/styleScrap/user/${id}`, 'get');
  },
  deleteStyleScrap: async (body) => {
    return await API(`/styleScrap/delete`, 'delete', JSON.stringify(body));
  },
};
export default StyleScrapAPI;
