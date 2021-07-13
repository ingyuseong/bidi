const userServices = require('../../services/user')

/*
    GET /api/user/:id
    * 사용자 정보 조회 API
*/
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log('??')
    const user = await userServices.getUser(id)

    res.json({
      message: '사용자 정보 조회 성공',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

/*
    GET /api/user/list
    * 전체 사용자 목록 조회 API
*/
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userServices.getUsers()

    res.json({
      message: '전체 사용자 목록 조회 성공',
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

/*
    POST /api/user/register
    * 회원가입 API
*/
exports.registerUser = async (req, res, next) => {
  try {
    const params = req.body
    const user = await userServices.registerUser(params)

    res.json({
      message: '회원가입 성공',
      data: user.id,
    })
  } catch (error) {
    next(error)
  }
}
