const db = require('./db/bid')

exports.editBid = async (params) => {
  const bid = await db.updateBid({ ...params })
  return bid
}

exports.deleteBid = async (id) => {
  const bid = await db.destroyBid(id)
  return bid
}

exports.getBidByDesignerId = async (userId) => {
  const bidList = await db.selectAllBidByDesignerId(userId)
  return bidList
}

exports.registerBid = async (params) => {
  const bid = await db.insertBid({ ...params })
  return bid
}

exports.registerBidStyle = async ({ bidId, styles }) => {
  const results = await Promise.all(
    styles.map((style) => {
      return db.insertBidStyle(bidId, style)
    })
  )
  return results
}
