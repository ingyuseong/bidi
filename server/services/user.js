const db = require('./db/user')

// Create User Resource [create]
exports.createUser = async (body) => {
  const attr = {
    user_type: body.user_type ? body.user_type : '',
    naver_token: body.naver_token ? body.naver_token : '',
    kakao_token: body.kakao_token ? body.kakao_token : '',
    apple_token: body.apple_token ? body.apple_token : '',
    name: body.name ? body.name : '',
    nick_name: body.nick_name ? body.nick_name : '',
    phone_number: body.phone_number ? body.phone_number : '',
    birth: body.birth ? body.birth : '',
    gender_type: body.gender_type ? body.gender_type : '',
    img_src: body.img_src ? body.img_src : '',
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
  const timeArray = (timeString) =>
    timeString ? timeString.split(',') : [null, null]
  let user = await db.findOneUserByToken(token)
  if (user) {
    if (user.scheduleInfo) {
      user = {
        ...user.dataValues,
        scheduleInfo: {
          weeklySchedule: [
            {
              date: '일',
              timeArray: timeArray(user.scheduleInfo.dataValues.sun),
            },
            {
              date: '월',
              timeArray: timeArray(user.scheduleInfo.dataValues.mon),
            },
            {
              date: '화',
              timeArray: timeArray(user.scheduleInfo.dataValues.tue),
            },
            {
              date: '수',
              timeArray: timeArray(user.scheduleInfo.dataValues.wed),
            },
            {
              date: '목',
              timeArray: timeArray(user.scheduleInfo.dataValues.thu),
            },
            {
              date: '금',
              timeArray: timeArray(user.scheduleInfo.dataValues.fri),
            },
            {
              date: '토',
              timeArray: timeArray(user.scheduleInfo.dataValues.sat),
            },
          ],
        },
      }
    }
    return user
  } else {
    return null
  }
}

// Update User Resource [update]
exports.updateUser = async (id, body) => {
  const user = await db.updateUser(id, body)
  if (user) {
    return user
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
