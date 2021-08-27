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

// Read User Resource [findOne, findAll]
exports.findAllUser = async () => {
  try {
    const userList = await db.findAllUser()
    if (userList && userList.length > 0) {
      return userList
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneUser = async (id) => {
  try {
    const user = await db.findOneUser(id)
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

// Update User Resource [update]
exports.updateUser = async (id, body) => {
  try {
    const attr = {
      name: body.userName ? body.userName : '',
      nick_name: body.userNickName ? body.userNickName : '',
      phone_number: body.userPhoneNumber ? body.userPhoneNumber : '',
      birth: body.userBirth ? body.userBirth : '',
      gender_type: body.userGenderType ? body.genderType : '',
    }
    const user = await db.updateUser(id, attr)
    if (user) {
      return user[0]
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateUserAiStatus = async (id, body) => {
  try {
    const { ai_status } = body
    const user = await db.updateUserAiStatus(id, ai_status)
    if (user) {
      return user
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Delete User Resoure [destroy]
exports.destroyUser = async (userId) => {
  try {
    const user = await db.destroyUser(userId)
    if (user) {
      return user
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
