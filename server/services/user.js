const db = require('./db/user')

// Create User Resource [create]
exports.createUser = async (body, location) => {
  try {
    const attr = {
      user_type: body.userType ? body.userType : '',
      naver_token: body.userNaverToken ? body.userNaverToken : '',
      kakao_token: body.userKakaoToken ? body.userKakaoToken : '',
      apple_token: body.userAppleToken ? body.userAppleToken : '',
      name: body.userName ? body.userName : '',
      nick_name: body.userNickName ? body.userNickName : '',
      phone_number: body.userPhoneNumber ? body.userPhoneNumber : '',
      birth: body.userBirth ? body.userBirth : '',
      gender_type: body.userGenderType ? body.genderType : '',
      img_src: location ? location : '',
    }
    const user = await db.createUser(attr)
    if (user) {
      return user.dataValues
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneUserByToken = async (body) => {
  try {
    const { token } = body
    const user = await db.findOneUserByToken(token)
    if (user) {
      return user.dataValues
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read User Resource [findOne, findAll]
exports.findOneUser = async (userId) => {
  const user = await db.findOneUser(userId)
  return user
}
exports.findAllUser = async () => {
  const user = await db.findAllUser()
  return user
}
exports.findLastUser = async () => {
  const user = await db.findLastUser()
  return user
}

// Update User Resource [update]
exports.updateUser = async (params) => {
  const user = await db.updateUser({ ...params })
  return user
}
exports.updateUserAiStatus = async (params) => {
  const user = await db.updateUserAiStatus({ ...params })
  return user
}

// Delete User Resoure [destroy]
exports.destroyUser = async (userId) => {
  const user = await db.destroyUser(userId)
  return user
}
