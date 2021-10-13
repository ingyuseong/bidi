const { Trial } = require('../../models')
const { Sequelize } = require('sequelize')

// Create Trial Resource [create]
exports.createTrial = async (attr) => {
  const trial = await Trial.create({
    raw: true,
    ...attr,
  })
  return trial
}

// Read Trial Resource [findAll]
exports.countTrial = async () => {
  const TrialList = await Trial.count({
    col: 'id',
  })
  return TrialList
}
exports.findAllTrial = async () => {
  const TrialList = await Trial.findAll({
    order: [['created_at', 'DESC']],
  })
  return TrialList
}

// Delete Bid Resource [destroy]
exports.destroyTrial = async (id) => {
  const trial = await Trial.destroy({
    where: {
      id,
    },
  })
  return trial
}
