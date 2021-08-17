const db = require('./db/matchingHistory')
const userDb = require('./db/user')
const bidDb = require('./db/bid')

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
    const designer = await userDb.selectUser(matchingHistory.designer_id)
    const customer = await userDb.selectUser(matchingHistory.customer_id)
    const bid = await bidDb.selectBidByCustomerId(matchingHistory.bid_id)
    result = {
      ...JSON.parse(result),
      designer: {
        name: designer.name,
        nick_name: designer.nick_name,
        img_src: designer.img_src,
        address: designer.address,
      },
      customer: {
        name: customer.name,
        nick_name: customer.nick_name,
        img_src: customer.img_src,
        address: customer.address,
      },
      bid,
    }
    result.proposal.keywords =
      result.proposal.keywords == ''
        ? []
        : result.proposal.keywords.replace(' ', '').split(',')
    if (result.review != '') {
      results.push(result)
    }
  }
  return results
}

exports.getMatchingHistoryByCustomerId = async (userId) => {
  const results = []
  const matchingHistoryList = await db.selectAllMatchingHistoryByCustomerId(
    userId
  )
  for await (const matchingHistory of matchingHistoryList) {
    let result = JSON.stringify(matchingHistory)
    const designer = await userDb.selectUser(matchingHistory.designer_id)
    const customer = await userDb.selectUser(matchingHistory.customer_id)
    const bid = await bidDb.selectBidByCustomerId(matchingHistory.bid_id)
    result = {
      ...JSON.parse(result),
      designer: {
        name: designer.name,
        nick_name: designer.nick_name,
        img_src: designer.img_src,
        address: designer.address,
      },
      customer: {
        name: customer.name,
        nick_name: customer.nick_name,
        img_src: customer.img_src,
        address: customer.address,
      },
      bid,
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
