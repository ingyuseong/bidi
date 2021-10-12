const db = require('./db/trial')

// Create Bid Resource [create]
exports.createTrial = async (body) => {
  const attr = {
    id: body.id,
    gender: body.gender,
    length: body.length,
    share: body.share,
  }
  const trial = await db.createTrial(attr)
  if (trial) {
    return trial.dataValues
  } else {
    return null
  }
}

// Read Trial Resource [findOne, findAll]
exports.countTrial = async () => {
  const trialCount = await db.countTrial()
  if (trialCount) {
    return trialCount
  } else {
    return null
  }
}
exports.findAllTrial = async () => {
  const trialList = await db.findAllTrial()
  if (trialList && trialList.length > 0) {
    return trialList
  } else {
    return null
  }
}

// Delete Trial Resoure [destroy]
exports.destroyTrial = async (id) => {
  const trial = await db.destroyTrial(id)
  if (trial) {
    return trial
  } else {
    return null
  }
}
