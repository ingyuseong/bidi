const db = require('./db/matching')
const proposalDb = require('./db/proposal')
const bidDb = require('./db/bid')
const { ERROR_MESSAGE } = require('../lib/constants')

// Create Matching Resource [create]
exports.createMatching = async (body) => {
  try {
    const proposal = await proposalDb.updateProposalMatching(body.proposal_id)
    const bid = await bidDb.updateBidMatching(body.bid_id)
    if (proposal && bid) {
      const attr = {
        bidId: body.bid_id,
        proposalId: body.proposal_id,
        customer_id: body.customer_id,
        designer_id: body.designer_id,
        shop_name: body.shop_name,
        address: body.address,
      }
      const matching = await db.createMatching(attr)
      if (matching) {
        return matching.dataValues
      } else {
        console.log('matching 생성 실패')
        return null
      }
    } else if (!proposal) {
      console.log('proposal matching 상태 업데이트 실패')
      return null
    } else if (!bid) {
      console.log('bid matching 상태 업데이트 실패')
      return null
    } else {
      throw new error()
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read Matching Resource [findOne, findAll]
exports.findOneMatching = async (id) => {
  try {
    let matching = await db.findOneMatching(id)
    console.log(matching)
    if (matching) {
      let proposal_keyword_array = []
      if (matching.proposal.keyword_array) {
        proposal_keyword_array = matching.proposal.keyword_array.split(',')
      }
      matching = {
        ...matching.dataValues,
        bid: {
          ...matching.bid.dataValues,
          bidStyles: matching.bid.bidStyles.map((style) => {
            let style_keyword_array = []
            if (style.keyword_array) {
              style_keyword_array = style.keyword_array.split(',')
            }
            return {
              ...style.dataValues,
              keyword_array: style_keyword_array,
              img_src_array: style.img_src_array.split(','),
            }
          }),
        },
        proposal: {
          ...matching.proposal.dataValues,
          keyword_array: proposal_keyword_array,
        },
      }
      return matching
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllMatchingByDesignerId = async (id) => {
  try {
    let matchingList = await db.findAllMatchingByDesignerId(id)
    if (matchingList && matchingList.length > 0) {
      matchingList = matchingList.map((matching) => {
        let proposal_keyword_array = []
        if (matching.proposal.keyword_array) {
          proposal_keyword_array = matching.proposal.keyword_array.split(',')
        }
        matching = {
          ...matching.dataValues,
          bid: {
            ...matching.bid.dataValues,
            bidStyles: matching.bid.bidStyles.map((style) => {
              let style_keyword_array = []
              if (style.keyword_array) {
                style_keyword_array = style.keyword_array.split(',')
              }
              return {
                ...style.dataValues,
                keyword_array: style_keyword_array,
                img_src_array: style.img_src_array.split(','),
              }
            }),
          },
          proposal: {
            ...matching.proposal.dataValues,
            keyword_array: proposal_keyword_array,
          },
        }
        return matching
      })
      return matchingList
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllMatchingByCustomerId = async (id) => {
  try {
    let matchingList = await db.findAllMatchingByCustomerId(id)
    if (matchingList && matchingList.length > 0) {
      matchingList = matchingList.map((matching) => {
        let proposal_keyword_array = []
        if (matching.proposal.keyword_array) {
          proposal_keyword_array = matching.proposal.keyword_array.split(',')
        }
        matching = {
          ...matching.dataValues,
          bid: {
            ...matching.bid.dataValues,
            bidStyles: matching.bid.bidStyles.map((style) => {
              let style_keyword_array = []
              if (style.keyword_array) {
                style_keyword_array = style.keyword_array.split(',')
              }
              return {
                ...style.dataValues,
                keyword_array: style_keyword_array,
                img_src_array: style.img_src_array.split(','),
              }
            }),
          },
          proposal: {
            ...matching.proposal.dataValues,
            keyword_array: proposal_keyword_array,
          },
        }
        return matching
      })
      return matchingList
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Update Matching Resource [update]
exports.updateProposal = async (id, body) => {
  try {
    const proposal = await db.updateProposal(id, body)
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingStatus = async (id, body) => {
  try {
    const { matching } = body
    const proposal = await db.updateMatchingStatus(id, matching)
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateBidMatching = async (params) => {
  const bid = await db.updateBidMatching({ ...params })
  return bid
}
exports.updateBidCancelElse = async (params) => {
  const bid = await db.updateBidCancelElse({ ...params })
  return bid
}

// Delete Matching Resoure [destroy]
exports.destroyProposal = async (id) => {
  try {
    const proposal = await db.destroyProposal(id)
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
