const scheduleInfo = require('../models/scheduleInfo')
const db = require('./db/scheduleInfo')

// Create Proposal Resource [create]
exports.createScheduleInfo = async (body) => {
  const attr = {
    designer_id: body.designer_id,
    mon: body.mon ? body.mon : null,
    tue: body.tue ? body.tue : null,
    wed: body.wed ? body.wed : null,
    thu: body.thu ? body.thu : null,
    fri: body.fri ? body.fri : null,
    sat: body.sat ? body.sat : null,
    sun: body.sun ? body.sun : null,
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
  let scheduleInfoList = await db.findAllScheduleInfo()
  if (scheduleInfoList && scheduleInfoList.length > 0) {
    scheduleInfoList = scheduleInfoList.map((schedule) => ({
      ...schedule.dataValues,
      mon: schedule.dataValues.mon
        ? schedule.dataValues.mon.split(',').map((time) => Number(time))
        : [],
      tue: schedule.dataValues.tue
        ? schedule.dataValues.tue.split(',').map((time) => Number(time))
        : [],
      wed: schedule.dataValues.wed
        ? schedule.dataValues.wed.split(',').map((time) => Number(time))
        : [],
      thu: schedule.dataValues.thu
        ? schedule.dataValues.thu.split(',').map((time) => Number(time))
        : [],
      fri: schedule.dataValues.fri
        ? schedule.dataValues.fri.split(',').map((time) => Number(time))
        : [],
      sat: schedule.dataValues.sat
        ? schedule.dataValues.sat.split(',').map((time) => Number(time))
        : [],
      sun: schedule.dataValues.sun
        ? schedule.dataValues.sun.split(',').map((time) => Number(time))
        : [],
    }))
    return scheduleInfoList
  } else {
    return null
  }
}
exports.findOneScheduleInfoByDesignerId = async (id) => {
  let scheduleInfo = await db.findOneScheduleInfoByDesignerId(id)
  if (scheduleInfo) {
    scheduleInfo = {
      ...scheduleInfo.dataValues,
      mon: scheduleInfo.dataValues.mon
        ? scheduleInfo.dataValues.mon.split(',').map((time) => Number(time))
        : [],
      tue: scheduleInfo.dataValues.tue
        ? scheduleInfo.dataValues.tue.split(',').map((time) => Number(time))
        : [],
      wed: scheduleInfo.dataValues.wed
        ? scheduleInfo.dataValues.wed.split(',').map((time) => Number(time))
        : [],
      thu: scheduleInfo.dataValues.thu
        ? scheduleInfo.dataValues.thu.split(',').map((time) => Number(time))
        : [],
      fri: scheduleInfo.dataValues.fri
        ? scheduleInfo.dataValues.fri.split(',').map((time) => Number(time))
        : [],
      sat: scheduleInfo.dataValues.sat
        ? scheduleInfo.dataValues.sat.split(',').map((time) => Number(time))
        : [],
      sun: scheduleInfo.dataValues.sun
        ? scheduleInfo.dataValues.sun.split(',').map((time) => Number(time))
        : [],
    }
    console.log(scheduleInfo)
    return scheduleInfo
  } else {
    return null
  }
}

// Update Proposal Resource [update]
exports.updateScheduleInfo = async (id, body) => {
  const attr = {
    mon: body.mon ? body.mon : null,
    tue: body.tue ? body.tue : null,
    wed: body.wed ? body.wed : null,
    thu: body.thu ? body.thu : null,
    fri: body.fri ? body.fri : null,
    sat: body.sat ? body.sat : null,
    sun: body.sun ? body.sun : null,
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
