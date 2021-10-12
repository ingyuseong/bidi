const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

/*
    [ 1. POST Methods ]
    POST /api/trial/register   : Third Party 시도 등록 API

    [ 2. GET Methods ]
    GET /api/trial/list   : Third Party 시도 목록 조회 API
    GET /api/trial/count  : Third Party 시도 목록 조회 API

    [ 3. PATCH Methods ]
    //

    [ 4. DELETE Methods]
    DELETE /api/styleScrap/delete : Third Party 시도 삭제 API
*/

router.post('/register', routesAsyncWrapper(controller.registerTrial))

router.get('/list', routesAsyncWrapper(controller.getTrialList))
router.get('/count', routesAsyncWrapper(controller.getTrialCount))

router.delete('/delete', routesAsyncWrapper(controller.deleteTrial))

module.exports = router
