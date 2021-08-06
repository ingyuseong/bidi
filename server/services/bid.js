const db = require('./db/bid')

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
