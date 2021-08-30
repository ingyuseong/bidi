const router = require('express').Router()
const controller = require('./controller')
const { routesAsyncWrapper } = require('../../lib/asyncWrapper')

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

router.post('/register', routesAsyncWrapper(controller.registerStyleScrap))

router.get('/user/:id', routesAsyncWrapper(controller.getStyleScrapList))

router.delete('/delete', routesAsyncWrapper(controller.deleteStyleScrap))

module.exports = router
