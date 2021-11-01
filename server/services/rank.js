const db = require('./db/rank')
const {COLOR_LIST} = require('../lib/constants')

// Create Rank Resource [create]
exports.createRank = async (body) => {
  const attr = {
    type: body.type,
    style: body.style,
  }
  const rank = await db.createRank(attr)
  if (rank) {
    return rank.dataValues
  } else {
    return null
  }
}

// Read Rank Resource [findOne, findAll]
exports.findAllRankByType = async (type) => {
  let result = []
  const rankList = await db.findAllRankByType(type)
  const totalRankCount = await db.findCountRankList(type)
  for(let i=0; i<rankList.length; i++){
    let data = {}
    data.title = rankList[i].style
    data.percent = Math.round((rankList[i].count / totalRankCount) * 100)
    data.color = COLOR_LIST[i]
    result.push(data)
  }
  if (result && result.length > 0) {
    return result
  } else {
    return null
  }
}
