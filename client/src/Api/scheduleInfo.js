import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/scheduleInfo/register     : 스케줄 등록 API
    
    [ 2. GET Methods ]
    GET /api/scheduleInfo/list          : 전체 스케줄 목록 조회 API
    GET /api/scheduleInfo/designer/:id  : 디자이너 ID로 스케줄 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/scheduleInfo/:id  : 스케줄 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/scheduleInfo/:id : 스케줄 정보 삭제 API
*/

const ScheduleInfoAPI = {
  registerScheduleInfo: async (body) => {
    return await API('/scheduleInfo/register', 'post', JSON.stringify(body));
  },
  getScheduleInfoByDesignerId: async (id) => {
    return await API(`/scheduleInfo/designer/${id}`, 'get');
  },
  patchScheduleInfo: async (id, body) => {
    return await API(`/scheduleInfo/${id}`, 'patch', JSON.stringify(body));
  },
  deleteScheduleInfo: async (id) => {
    return await API(`/scheduleInfo/${id}`, 'delete');
  },
};
export default ScheduleInfoAPI;
