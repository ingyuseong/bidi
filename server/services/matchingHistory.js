const db = require('./db/matchingHistory')
const userDb = require('./db/user')

exports.deleteMatchingHistory = async (id) => {
  const matchingHistory = await db.destroyMatchingHistory(id)
  return matchingHistory
}

exports.getMatchingHistoryByDesignerId = async (userId) => {
  const results = []
  const matchingHistoryList = await db.selectAllMatchingHistoryByDesignerId(
    userId
  )
  for await (const matchingHistory of matchingHistoryList) {
    let result = JSON.stringify(matchingHistory)
    const { name, img_src, address } = await userDb.selectUser(
      matchingHistory.customer_id
    )
    result = {
      ...JSON.parse(result),
      user: { name, nick_name, img_src, address },
    }
    results.push(result)
  }
  return results
}

exports.getMatchingHistoryByCustomerId = async (userId) => {
  const results = []
  const matchingHistoryList = await db.selectAllMatchingHistoryByCustomerId(
    userId
  )
  console.log(matchingHistoryList)
  for await (const matchingHistory of matchingHistoryList) {
    let result = JSON.stringify(matchingHistory)
    const { name, nick_name, img_src, address } = await userDb.selectUser(
      matchingHistory.designer_id
    )
    result = {
      ...JSON.parse(result),
      user: { name, nick_name, img_src, address },
    }
    results.push(result)
  }
  return results
}

exports.registerMatchingHistory = async (params) => {
  const matchingHistory = await db.insertMatchingHistory({ ...params })
  return matchingHistory
}

exports.editReview = async (params) => {
  const matchingHistory = await db.updateReview({ ...params })
  return matchingHistory
}

exports.editStar = async (params) => {
  const matchingHistory = await db.updateStar({ ...params })
  return matchingHistory
}
