const userServices = require('../../services/user')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')
const axios = require('axios')
require('dotenv').config()

// [ 1. POST Methods ]
exports.registerUser = async (req, res, next) => {
  try {
    const body = req.body
    const { location } = req.file
    const user = await userServices.createUser(body, location)
    if (user) {
      res.status(STATUS_CODE.CREATED).json({
        message: '회원가입 성공',
        data: user,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '회원가입 실패',
        data: user,
      })
    }
  } catch (error) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.checkToken = async (req, res, next) => {
  try {
    const body = req.body
    const user = await userServices.findOneUserByToken(body)
    if (user) {
      return res.status(STATUS_CODE.SUCCESS).json({
        message: '유저 Token Check 성공',
        data: user,
      })
    } else {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저 Token Check 실패(No resource)',
        data: null,
      })
    }
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGE.SERVER_ERROR,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
    })
  }
}
exports.inferenceAI = async (req, res, next) => {
  try {
    const { id, gender, img_src } = req.body
    const inference = await axios({
      method: 'post',
      url: process.env.Bidi_AI_URL,
      data: {
        user_id: id,
        gender,
        img_src,
      },
    })
      .then(async (result) => {
        response = result.data
        const user = await userServices.updateUserAiStatus(id, ai_status)
        if (user) {
          return res.status(STATUS_CODE.SUCCESS).json({
            message: 'AI Status 수정 성공',
            data: response,
          })
        } else {
          return res.status(STATUS_CODE.SUCCESS).json({
            message: 'AI Status 수정 실패',
            data: null,
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.findOneUser(id)
    if (user) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '사용자 정보 조회 성공',
        data: user,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '사용자 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getUserList = async (req, res, next) => {
  try {
    const userList = await userServices.findAllUser()
    if (userList) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 사용자 목록 조회 성공',
        data: userList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 사용자 목록 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const updatedUserCount = await userServices.updateUser(id, body)
    if (updatedUserCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '사용자 정보 수정 성공',
        data: updatedUserCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '사용자 정보 수정 실패(No resources or No change)',
        data: null,
      })
    }
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUserCount = await userServices.destroyUser(id)
    if (deletedUserCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '사용자 정보 삭제 성공',
        data: deletedUserCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '사용자 정보 삭제 실패(No resources)',
        data: deletedProposalCount,
      })
    }
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
