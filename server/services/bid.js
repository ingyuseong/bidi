const db = require('./db/bid')
const userDb = require('./db/user')

// Create Bid Resource [create]
exports.createBid = async (body) => {
  try {
    const attr = {
      proposalId: body.proposal_id,
      customer_id: body.customer_id,
      designer_id: body.designer_id,
      style_type: body.style_type,
      length_type: body.length_type,
      letter: body.letter,
      need_care: body.need_care,
    }
    const bid = await db.createBid(attr)
    if (bid) {
      return bid.dataValues
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.createBidStyle = async ({ bidId, stylesIdString }) => {
  try {
    if (stylesIdString) {
      const bidStyleList = await Promise.all(
        stylesIdString.split(',').map((styleId) => {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllBidByCustomerId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneBid = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Update Bid Resource [update]
exports.updateBid = async (params) => {
  const bid = await db.updateBid({ ...params })
  return bid
}
exports.updateBidCanceled = async (id, body) => {
  const { canceled } = body
  const bid = await db.updateBidCanceled(id, body)
  return bid
}

// Delete Bid Resoure [destroy]
exports.destroyBid = async (id) => {
  const bid = await db.destroyBid(id)
  return bid
}
