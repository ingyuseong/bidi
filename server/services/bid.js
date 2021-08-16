const proposal = require('../models/proposal')
const db = require('./db/bid')
const userDb = require('./db/user')

exports.editBid = async (params) => {
  const bid = await db.updateBid({ ...params })
  return bid
}

exports.deleteBid = async (id) => {
  const bid = await db.destroyBid(id)
  return bid
}

exports.getBidByDesignerId = async (userId) => {
  const results = []
  const bidList = await db.selectAllBidByDesignerId(userId)
  for await (const bid of bidList) {
    const {
      id,
      designer_id,
      large_category,
      small_category,
      letter,
      need_care,
      status,
      created_at,
    } = bid
    const result = {
      id,
      designer_id,
      user: bid.proposal.user.dataValues,
      proposal: {
        ...bid.proposal.dataValues,
        keywords:
          bid.proposal.keywords == ''
            ? []
            : bid.proposal.keywords.replace(' ', '').split(','),
      },
      large_category,
      small_category,
      letter,
      need_care,
      status,
      created_at,
    }
    results.push(result)
  }
  return results
}

exports.registerBid = async (params) => {
  const bid = await db.insertBid({ ...params })
  return bid
}

exports.editBidStatus = async (params) => {
  const bid = await db.updateBidStatus({ ...params })
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

exports.getBidByCustomerId = async (userId) => {
  const results = []
  const progressBid = []
  const bidList = await db.selectAllBidByCustomerId(userId)
  for await (const bid of bidList) {
    let result = JSON.stringify(bid)
    const { name, nick_name, img_src, address } = await userDb.selectUser(
      bid.designer_id
    )
    result = {
      ...JSON.parse(result),
      user: { name, nick_name, img_src, address },
    }
    if (result.status == 'wait') results.push(result)
    if (result.status == 'process') progressBid.push(result)
  }
  if (progressBid.length) return progressBid
  return results
}
