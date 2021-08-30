const db = require('./db/user')

// Create User Resource [create]
exports.createUser = async (body, location) => {
  const attr = {
    user_type: body.userType ? body.userType : '',
    naver_token: body.naver_token ? body.naver_token : '',
    kakao_token: body.kakao_token ? body.kakao_token : '',
    apple_token: body.apple_token ? body.apple_token : '',
    name: body.name ? body.name : '',
    nick_name: body.nick_name ? body.nick_name : '',
    phone_number: body.phone_number ? body.phone_number : '',
    birth: body.birth ? body.birth : '',
    gender_type: body.gender_type ? body.gender_type : '',
    img_src: location ? location : '',
  }
  const user = await db.createUser(attr)
  if (user) {
    return user.dataValues
  } else {
    return null
  }
}

// Read User Resource [findOne, findAll]
exports.findAllUser = async () => {
  const userList = await db.findAllUser()
  if (userList && userList.length > 0) {
    return userList
  } else {
    return null
  }
}
exports.findOneUser = async (id) => {
  const user = await db.findOneUser(id)
  if (user) {
    return user.dataValues
  } else {
    return null
  }
}
exports.findOneUserByToken = async (body) => {
  const { token } = body
  const user = await db.findOneUserByToken(token)
  if (user) {
    return user.dataValues
  } else {
    return null
  }
}

// Update User Resource [update]
exports.updateUser = async (id, body) => {
  const attr = {
    name: body.name ? body.name : '',
    nick_name: body.nick_name ? body.nick_name : '',
    phone_number: body.phone_number ? body.phone_number : '',
    birth: body.birth ? body.birth : '',
    gender_type: body.gender_type ? body.gender_type : '',
  }
  const user = await db.updateUser(id, attr)
  if (user) {
    return user[0]
  } else {
    return null
  }
}
exports.updateUserAiStatus = async (id, body) => {
  const { ai_status } = body
  const user = await db.updateUserAiStatus(id, ai_status)
  if (user) {
    return user
  } else {
    return null
  }
}

// Delete User Resoure [destroy]
exports.destroyUser = async (id) => {
  const user = await db.destroyUser(id)
  if (user) {
    return user
  } else {
    return null
  }
}
