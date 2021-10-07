const { ScheduleInfo, User } = require('../../models')

// Create ScheduleInfo Resource [create]
exports.createScheduleInfo = async (attr) => {
  const scheduleInfo = await ScheduleInfo.create({
    raw: true,
    ...attr,
  })
  return scheduleInfo
}

// Read ScheduleInfo Resource [findOne, findAll]
exports.findAllScheduleInfo = async () => {
  const scheduleInfo = await ScheduleInfo.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
    ],
  })
  return scheduleInfo
}
exports.findOneScheduleInfoByDesignerId = async (id) => {
  const scheduleInfo = await ScheduleInfo.findOne({
    where: {
      designer_id: id,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
    ],
  })
  return scheduleInfo
}

// Update ScheduleInfo Resource [update]
exports.updateScheduleInfo = async (id, attr) => {
  const scheduleInfo = await ScheduleInfo.update(
    {
      raw: true,
      ...attr,
    },
    {
      where: {
        id,
      },
    }
  )
  return scheduleInfo[0]
}

// Delete ScheduleInfo Resource [destroy]
exports.destroyScheduleInfo = async (id) => {
  const scheduleInfo = await ScheduleInfo.destroy({
    where: {
      id,
    },
  })
  return scheduleInfo
}
