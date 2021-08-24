const router = require('express').Router()
const controller = require('./controller')

/*
    [ 1. POST Methods ]
    POST /api/styleScrap/register   : 스타일스크랩 등록 API

    [ 2. GET Methods ]
    GET /api/styleScarp/:userId   : 유저의 스타일스크랩 목록 조회 API

    [ 3. PATCH Methods ]
    //

    [ 4. DELETE Methods]
    DELETE /api/styleScrap/:userId/:styleId : 스타일스크랩 삭제 API
*/

router.post('/register', controller.registerStyleScrap)

router.get('/:userId', controller.getStyleScrapList)

router.delete('/:userId/:styleId', controller.deleteStyleScrap)

module.exports = router
