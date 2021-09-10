const db = require('./db/scheduleInfo')

// Create Proposal Resource [create]
exports.createScheduleInfo = async (body) => {
  const attr = {
    designer_id: body.designer_id,
    start_time: Number(body.start_time),
    end_time: Number(body.end_time),
    holiday_array: body.holiday_array,
  }
  const scheduleInfo = await db.createScheduleInfo(attr)
  if (scheduleInfo) {
    return scheduleInfo.dataValues
  } else {
    return null
  }
}

// Read Proposal Resource [findOne, findAll]
exports.findAllScheduleInfo = async () => {
  const scheduleInfoList = await db.findAllScheduleInfo()
  if (scheduleInfoList && scheduleInfoList.length > 0) {
    return scheduleInfoList
  } else {
    return null
  }
}
exports.findOneScheduleInfoByDesignerId = async (id) => {
  const scheduleInfo = await db.findOneScheduleInfoByDesignerId(id)
  if (scheduleInfo) {
    return scheduleInfo
  } else {
    return null
  }
}

// Update Proposal Resource [update]
exports.updateScheduleInfo = async (id, body) => {
  const attr = {
    start_time: body.start_time,
    end_time: body.end_time,
    holiday_array: body.holiday_array,
  }
  const scheduleInfo = await db.updateScheduleInfo(id, attr)
  if (scheduleInfo) {
    return scheduleInfo
  } else {
    return null
  }
}

// Delete Proposal Resoure [destroy]
exports.destroyScheduleInfo = async (id) => {
  const scheduleInfo = await db.destroyScheduleInfo(id)
  if (scheduleInfo) {
    return scheduleInfo
  } else {
    return null
  }
}
