const userServices = require('../../services/user')
const { STATUS_CODE } = require('../../lib/constants')
const axios = require('axios')
require('dotenv').config()

// [ 1. POST Methods ]
exports.registerUser = async (req, res) => {
  const body = req.body
  const img_src = req?.file?.location
  const user = await userServices.createUser({ ...body, img_src })
  if (user) {
    res.status(STATUS_CODE.CREATED).json({
      state: 'success',
      message: '회원가입 성공',
      data: user,
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      state: 'failed',
      message: '회원가입에 실패했습니다',
      data: {},
    })
  }
}
exports.checkToken = async (req, res) => {
  const body = req.body
  const user = await userServices.findOneUserByToken(body)
  console.log('body', body)
  console.log('user', usr)
  if (user) {
    return res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '유저 Token Check 성공',
      data: user,
    })
  } else {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      state: 'failed',
      message: '해당 Token은 아직 등록되지 않았습니다',
      data: {},
    })
  }
}
exports.inferenceAI = async (req, res) => {
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
          status: 'success',
          message: 'AI Status 수정 성공',
          data: response,
        })
      } else {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          status: 'failed',
          message: 'AI Status 수정 실패',
          data: null,
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// [ 2. GET Methods ]
exports.getUserList = async (req, res) => {
  const userList = await userServices.findAllUser()
  if (userList) {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '전체 사용자 목록 조회 성공',
      data: userList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 사용자 목록이 없습니다',
      data: [],
    })
  }
}
exports.getUser = async (req, res) => {
  const { id } = req.params
  const user = await userServices.findOneUser(id)
  if (user) {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'success',
      message: '사용자 정보 조회 성공',
      data: user,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      state: 'empty',
      message: '조회할 사용자 정보가 없습니다',
      data: {},
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchUser = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const img_src = req?.file?.location
  const updatedUserCount = await userServices.updateUser(id, {
    ...body,
    img_src,
  })
  if (updatedUserCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '사용자 정보 수정 성공',
      data: updatedUserCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 사용자 정보가 없습니다',
      data: 1,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteUser = async (req, res) => {
  const { id } = req.params
  const deletedUserCount = await userServices.destroyUser(id)
  if (deletedUserCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '사용자 정보 삭제 성공',
      data: deletedUserCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 사용자 정보가 없습니다',
      data: deletedUserCount,
    })
  }
}
