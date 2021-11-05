const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

/*
    [ 1. POST Methods ]
    POST /api/rank/register   : Third Party 등록 완료 API

    [ 2. GET Methods ]
    GET /api/rank/:type   : Third Party Rank 목록 조회 API

    [ 3. PATCH Methods ]

    [ 4. DELETE Methods]
*/

router.post('/register', routesAsyncWrapper(controller.registerRank))

router.get('/:type', routesAsyncWrapper(controller.getRankResult))


module.exports = router
