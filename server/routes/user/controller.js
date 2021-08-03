const userServices = require('../../services/user')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')
const axios = require('axios')
require('dotenv').config()
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
    POST /api/user/token
    * token을 통해 회원 조회 API
*/
exports.checkToken = async (req, res, next) => {
  try {
    const { token } = req.body
    const user = await userServices.getUserByToken(token)
    console.log('>>', user)

    if (user) {
      return res.status(STATUS_CODE.SUCCESS).json({
        message: '이미 회원가입한 유저',
        data: user,
      })
    }
    return res.status(STATUS_CODE.CLIENT_ERROR).json({
      message: '회원가입 하지 않았음',
      data: false,
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
    const {
      userType,
      userName,
      userGender,
      userBirth,
      userNickName,
      userPhoneNumber,
      userEmail,
      userAddress,
      userKakaoToken = '',
      userNaverToken = '',
    } = req.body
    const { location } = req.file
    const params = {
      type: userType,
      kakao_token: userKakaoToken,
      naver_token: userNaverToken,
      name: userName,
      address: userAddress,
      img_src: location,
      email: userEmail,
      nick_name: userNickName,
      phone_number: userPhoneNumber,
      birth: userBirth,
      gender: userGender,
    }
    const user = await userServices.registerUser(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '회원가입 성공',
      data: user.id,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
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
      .then((result) => {
        response = result.data
        console.log(response)
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
