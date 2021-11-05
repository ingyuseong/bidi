const { Rank } = require('../../models')
const Sequelize = require('sequelize')

// Create Rank Resource [create]
exports.createRank = async (attr) => {
  const rank = await Rank.create({
    raw: true,
    ...attr,
  })
  return rank
}

// Read Rank Resource [findAll]
exports.findAllRankByType = async (type) => {
  const rankList = await Rank.findAll({
    raw: true,
    where: {
      type,
    },
    attributes: [
      'style',
      'style_id',
      'type',
      [Sequelize.fn('count', Sequelize.col('style')), 'count'],
    ],
    group: ['style', 'style_id', 'type'],
    order: [[Sequelize.col('count'), 'DESC']],
  })
  return rankList
}
exports.findCountRankList = async (type) => {
  const rankCount = await Rank.count({
    raw: true,
    where: {
      type,
    },
  })
  return rankCount
}
