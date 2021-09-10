const db = require('./db/matching')
const proposalDb = require('./db/proposal')
const bidDb = require('./db/bid')

// Create Matching Resource [create]
exports.createMatching = async (body) => {
  console.log(body)
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
}

// Read Matching Resource [findOne, findAll]
exports.findAllMatching = async () => {
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
}
exports.findOneMatching = async (id) => {
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
}
exports.findOneMatchingByCustomerId = async (id) => {
  let matching = await db.findOneMatchingByCustomerId(id)
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
}
exports.findAllMatchingByDesignerId = async (id) => {
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
}
exports.findAllMatchingHistoryByCustomerId = async (id) => {
  let matchingList = await db.findAllMatchingHistoryByCustomerId(id)
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
}
exports.findAllMatchingHistoryByDesignerId = async (id) => {
  let matchingList = await db.findAllMatchingHistoryByDesignerId(id)
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
}

// Update Matching Resource [update]
exports.updateMatchingStyle = async (id, body) => {
  const { style_id } = body
  const matching = await db.updateMatchingStyle(id, style_id)
  return matching
}
exports.updateMatchingReview = async (id, body) => {
  const { review } = body
  const matching = await db.updateMatchingReview(id, review)
  return matching
}
exports.updateMatchingStar = async (id, body) => {
  const { star } = body
  const matching = await db.updateMatchingStar(id, star)
  return matching
}
exports.updateMatchingReserved = async (id) => {
  const matching = await db.updateMatchingReserved(id)
  return matching
}
exports.updateMatchingDone = async (id) => {
  // 이 지점에서 matchingSchedule 생성
  // 이 지점에서 결제 진행여부 확인
  const matching = await db.updateMatchingDone(id)
  return matching
}
exports.updateMatchingCanceled = async (id) => {
  const matching = await db.updateMatchingCanceled(id)
  return matching
}

// Delete Matching Resoure [destroy]
exports.destroyMatching = async (id) => {
  const matching = await db.destroyMatching(id)
  return matching
}
