const { Schedule, User } = require('../../models')

// Create Schedule Resource [create]
exports.createSchedule = async (attr) => {
  const schedule = await Schedule.create({
    raw: true,
    ...attr,
  })
  return schedule
}

// Read Schedule Resource [findOne, findAll]
exports.findAllSchedule = async () => {
  const ScheduleList = await Schedule.findAll()
  return ScheduleList
}
exports.findAllScheduleByDesignerId = async (designer_id) => {
  const ScheduleList = await Schedule.findAll({
    where: {
      designer_id,
    },
  })
  return ScheduleList
}
exports.findAllScheduleByDate = async (designer_id) => {
  const ScheduleList = await Schedule.findAll({
    where: {
      designer_id,
    },
  })
  return ScheduleList
}

// Delete Schedule Resource [destroy]
exports.destroySchedule = async (id) => {
  const schedule = await Schedule.destroy({
    where: {
      id,
    },
  })
  return schedule
}
