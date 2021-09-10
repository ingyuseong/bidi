const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

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

router.post('/register', routesAsyncWrapper(controller.registerScheduleInfo))

router.get('/list', routesAsyncWrapper(controller.getScheduleInfoList))
router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getScheduleInfoByDesignerId)
)

router.patch('/:id', routesAsyncWrapper(controller.patchScheduleInfo))

router.delete('/:id', routesAsyncWrapper(controller.deleteScheduleInfo))

module.exports = router
