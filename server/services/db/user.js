const { User, ScheduleInfo } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

// Create User Resource [create]
exports.createUser = async (attr) => {
  const user = await User.create({
    raw: true,
    ...attr,
    authentication: false,
    ai_status: false,
    ai_process: false,
    ai_count: 0,
  })
  return user
}

// Read User Resource [findOne, findAll]
exports.findAllUser = async () => {
  const userList = await User.findAll({
    include: [
      {
        model: ScheduleInfo,
        attributes: ['start_time', 'end_time', 'holiday_array'],
      },
    ],
    order: [['id', 'ASC']],
  })
  return userList
}
exports.findOneUser = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
  })
  return user
}
exports.findOneUserByToken = async (token) => {
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
}
exports.findLastUser = async () => {
  const user = await User.findOne({
    raw: true,
    limit: 1,
    order: [['id', 'DESC']],
  })
  return user
}

// Update User Resource [update]
exports.updateUser = async (id, body) => {
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
}

exports.updateUserAiStatus = async (id, ai_status) => {
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
}

// Delete User Resource [destroy]
exports.destroyUser = async (id) => {
  const user = await User.destroy({
    where: {
      id,
    },
  })
  return user
}
