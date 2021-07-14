const userServices = require('../../services/user')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/user/:id
    * 사용자 정보 조회 API
*/
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.getUser(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '사용자 정보 조회 성공',
      data: user,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    PATCH /api/user/:id
    * 사용자 정보 수정 API
*/
exports.editUser = async (req, res, next) => {
  try {
    const params = req.params
    const user = await userServices.editUser(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '사용자 정보 수정 성공',
      data: user,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    DELETE /api/user/:id
    * 사용자 정보 삭제 API
*/
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.deleteUser(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '사용자 정보 삭제 성공',
      data: user,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    GET /api/user/list
    * 전체 사용자 목록 조회 API
*/
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userServices.getUsers()

    res.status(STATUS_CODE.SUCCESS).json({
      message: '전체 사용자 목록 조회 성공',
      data: users,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
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

    res.status(STATUS_CODE.SUCCESS).json({
      message: '회원가입 성공',
      data: user.id,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
