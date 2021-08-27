const { User } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

// Create User Resource [create]
exports.createUser = async (attr) => {
  try {
    const user = await User.create({
      raw: true,
      ...attr,
      authentication: false,
      ai_status: false,
      ai_process: false,
      ai_count: 0,
    })
    return user
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}

// Read User Resource [findOne, findAll]
exports.findAllUser = async () => {
  try {
    const userList = await User.findAll({
      order: [['id', 'ASC']],
    })
    return userList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneUser = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    })
    return user
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneUserByToken = async (token) => {
  try {
    const user = await User.findOne({
      where: {
        [or]: [
          { naver_token: token },
          { kakao_token: token },
          { apple_token: token },
        ],
      },
    })
    return user
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Update User Resource [update]
exports.updateUser = async (id, body) => {
  try {
    const user = await User.update(
      {
        raw: true,
        ...body,
      },
      {
        where: {
          id,
        },
      }
    )
    return user[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

exports.updateUserAiStatus = async (id, ai_status) => {
  try {
    const user = await User.update(
      {
        raw: true,
        ai_status,
      },
      {
        where: {
          id,
        },
      }
    )
    return user[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Delete User Resource [destroy]
exports.destroyUser = async (id) => {
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    })
    return user
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_DELETE_ERROR)
    console.error(err)
    return null
  }
}
