const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/upload')

/*
    [ 1. POST Methods ]
    POST /api/user/register     : 회원가입 API
    POST /api/user/checkToken   : token을 통해 회원 조회 API
    POST /api/user/inferenceAI  : AI inference API
    
    [ 2. GET Methods ]
    GET /api/user/list  : 전체 사용자 목록 조회 API
    GET /api/user/:id   : 사용자 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/user/:id  : 사용자 정보 수정 API

    [ 4. DELETE Methods]
    DELETE /api/user/:id : 사용자 정보 삭제 API
*/

router.post('/register', upload.single('userImage'), controller.registerUser)
router.post('/checkToken', controller.checkToken)
router.post('/inferenceAI', controller.inferenceAI)

router.get('/list', controller.getUserList)
router.get('/:id', controller.getUser)

router.patch('/:id', controller.patchUser)

router.delete('/:id', controller.deleteUser)

module.exports = router
