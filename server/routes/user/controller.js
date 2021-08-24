const userServices = require('../../services/user')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')
const axios = require('axios')
require('dotenv').config()

// [ 1. POST Methods ]
exports.registerUser = async (req, res, next) => {
  try {
    const {
      userType,
      userNaverToken = '',
      userKakaoToken = '',
      userAppleToken = '',
      userName,
      userNickName,
      userPhoneNumber = '',
      userBirth = '',
      userGenderType,
    } = req.body
    const { location } = req.file
    const params = {
      user_type: userType,
      naver_token: userNaverToken,
      kakao_token: userKakaoToken,
      apple_token: userAppleToken,
      name: userName,
      nick_name: userNickName,
      phone_number: userPhoneNumber,
      birth: userBirth,
      gender_type: userGenderType,
      img_src: location,
      authentication: false,
      ai_status: false,
      ai_process: false,
      ai_count: 0,
    }
    const user = await userServices.createUser(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '회원가입 성공',
      data: user,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.checkToken = async (req, res, next) => {
  try {
    const { token } = req.body
    const user = await userServices.findOneUserByToken(token)

    if (user) {
      return res.status(STATUS_CODE.SUCCESS).json({
        message: '이미 회원가입한 유저',
        data: user,
        status: STATUS_CODE.SUCCESS,
      })
    }
    return res.status(STATUS_CODE.CLIENT_ERROR).json({
      message: '회원가입 하지 않았음',
      data: false,
      status: STATUS_CODE.CLIENT_ERROR,
    })
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      message: ERROR_MESSAGE.SERVER_ERROR,
      status: STATUS_CODE.SERVER_ERROR,
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
        const user = await userServices.updateUserAiStatus({
          id,
          ai_status: true,
        })
        return res.status(STATUS_CODE.SUCCESS).json(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.findOneUser(id)

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
exports.getUserList = async (req, res, next) => {
  try {
    const userList = await userServices.findAllUser()
    res.status(STATUS_CODE.SUCCESS).json({
      message: '전체 사용자 목록 조회 성공',
      data: userList,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchUser = async (req, res, next) => {
  try {
    const params = req.params
    const user = await userServices.updateUser(params)
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

// [ 4. DELETE Methods]
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.destroyUser(id)

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
