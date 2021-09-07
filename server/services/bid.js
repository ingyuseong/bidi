const db = require('./db/bid')

// Create Bid Resource [create]
exports.createBid = async (body) => {
  const attr = {
    proposalId: body.proposal_id,
    customer_id: body.customer_id,
    designer_id: body.designer_id,
    style_type: body.style_type,
    length_type: body.length_type,
    address: body.address ? body.address : null,
    letter: body.letter,
    need_care: body.need_care,
  }
  const bid = await db.createBid(attr)
  if (bid) {
    return bid.dataValues
  } else {
    return null
  }
}

exports.createBidStyle = async ({ bidId, styleIdList }) => {
  if (styleIdList) {
    const bidStyleList = await Promise.all(
      styleIdList.split(',').map((styleId) => {
        const attr = {
          bidId,
          styleId,
        }
        return db.createBidStyle(attr)
      })
    )
    if (bidStyleList) {
      return bidStyleList
    } else {
      return null
    }
  } else {
    return null
  }
}

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (id) => {
  let bidList = await db.findAllBidByDesignerId(id)
  if (bidList && bidList.length > 0) {
    bidList = bidList.map((bid) => {
      let keyword_array = []
      if (bid.proposal.keyword_array) {
        keyword_array = bid.proposal.keyword_array.split(',')
      }
      return {
        ...bid.dataValues,
        proposal: {
          ...bid.proposal.dataValues,
          keyword_array,
        },
        bidStyles: bid.bidStyles.map((style) => {
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
      }
    })
    return bidList
  } else {
    return null
  }
}
exports.findAllBidByCustomerId = async (id) => {
  let bidList = await db.findAllBidByCustomerId(id)
  if (bidList && bidList.length > 0) {
    bidList = bidList.map((bid) => {
      let keyword_array = []
      if (bid.proposal.keyword_array) {
        keyword_array = bid.proposal.keyword_array.split(',')
      }
      return {
        ...bid.dataValues,
        proposal: {
          ...bid.proposal.dataValues,
          keyword_array,
        },
        bidStyles: bid.bidStyles.map((style) => {
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
      }
    })
    return bidList
  } else {
    return null
  }
}
exports.findOneBid = async (id) => {
  let bid = await db.findOneBid(id)
  if (bid) {
    let keyword_array = []
    if (bid.proposal.keyword_array) {
      keyword_array = bid.proposal.keyword_array.split(',')
    }
    bid = {
      ...bid.dataValues,
      proposal: {
        ...bid.proposal.dataValues,
        keyword_array,
      },
      bidStyles: bid.bidStyles.map((style) => {
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
    }
    return bid
  } else {
    return null
  }
}

// Update Bid Resource [update]
exports.updateBid = async (id, body) => {
  const attr = {
    style_type: body.style_type,
    length_type: body.length_type,
    letter: body.letter,
    need_care: body.need_care,
  }
  const bid = await db.updateBid(id, attr)
  if (bid) {
    return bid
  } else {
    return null
  }
}
exports.updateBidCanceled = async (id) => {
  const bid = await db.updateBidCanceled(id)
  if (bid) {
    return bid
  } else {
    return null
  }
}

// Delete Bid Resoure [destroy]
exports.destroyBid = async (id) => {
  const bid = await db.destroyBid(id)
  if (bid) {
    return bid
  } else {
    return null
  }
}
