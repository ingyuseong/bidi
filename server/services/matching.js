const db = require('./db/matching')
const proposalDb = require('./db/proposal')
const bidDb = require('./db/bid')
const { ERROR_MESSAGE } = require('../lib/constants')

// Create Matching Resource [create]
exports.createMatching = async (body) => {
  try {
    const proposal = await proposalDb.updateProposalMatching(body.proposal_id)
    const bidCancelElse = await bidDb.updateBidCancelElseByCustomerId(
      body.customer_id
    )
    const bid = await bidDb.updateBidMatching(body.bid_id)
    if (proposal && bid && bidCancelElse) {
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
    } else if (!bidCancelElse) {
      console.log('other bids matching 상태 업데이트 실패')
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
exports.findAllMatching = async () => {
  try {
    let matchingList = await db.findAllMatching()
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
exports.findOneMatching = async (id) => {
  try {
    let matching = await db.findOneMatching(id)
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

// Update Matching Resource [update]
exports.updateMatchingTime = async (id, body) => {
  try {
    const { time } = body
    const matching = await db.updateMatchingTime(id, time)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingReview = async (id, body) => {
  try {
    const { review } = body
    const matching = await db.updateMatchingReview(id, review)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingStar = async (id, body) => {
  try {
    const { star } = body
    const matching = await db.updateMatchingStar(id, star)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingDone = async (id, body) => {
  try {
    const { done } = body
    const matching = await db.updateMatchingDone(id, done)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingCanceled = async (id, body) => {
  try {
    const { cancel } = body
    const matching = await db.updateMatchingCanceled(id, cancel)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Delete Matching Resoure [destroy]
exports.destroyMatching = async (id) => {
  try {
    const matching = await db.destroyMatching(id)
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
