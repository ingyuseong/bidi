import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/schedule/register     : 스케줄 등록 API
    
    [ 2. GET Methods ]
    GET /api/schedule/list          : 전체 스케줄 목록 조회 API
    GET /api/schedule/designer/:id  : 디자이너 ID로 스케줄 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/schedule/:id  : 스케줄 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/schedule/:id : 스케줄 정보 삭제 API
*/

const ScheduleAPI = {
  registerSchedule: async (body) => {
    return await API('/schedule/register', 'post', JSON.stringify(body));
  },
  getScheduleListByDate: async (body) => {
    return await API('/schedule/date', 'post', JSON.stringify(body));
  },
  getScheduleByDesignerId: async (id) => {
    return await API(`/schedule/designer/${id}`, 'get');
  },
  patchSchedule: async (id, body) => {
    return await API(`/schedule/${id}`, 'patch', JSON.stringify(body));
  },
  deleteSchedule: async (id) => {
    return await API(`/schedule/${id}`, 'delete');
  },
};
export default ScheduleAPI;
