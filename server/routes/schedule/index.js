const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

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

router.post('/register', routesAsyncWrapper(controller.registerSchedule))

router.get('/list', routesAsyncWrapper(controller.getScheduleList))
router.get(
  '/designer/:id',
  routesAsyncWrapper(controller.getScheduleByDesignerId)
)

router.patch('/:id', routesAsyncWrapper(controller.patchSchedule))

router.delete('/:id', routesAsyncWrapper(controller.deleteSchedule))

module.exports = router
