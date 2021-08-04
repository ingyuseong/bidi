const { Bid, BidStyle } = require('../../models')

exports.insertBid = async ({
  customer_id,
  designer_id,
  proposal_id,
  large_category,
  small_category,
  letter,
  need_care,
  status,
}) =>
  await Bid.create({
    raw: true,
    customer_id,
    designer_id,
    proposal_id,
    large_category,
    small_category,
    letter,
    need_care,
    status,
  })
    .then((results) => {
      console.log('Success Creating Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Bid')
      return err
    })

exports.insertBidStyle = async (bidId, styleId) =>
  await BidStyle.create({
    raw: true,
    bidId,
    styleId,
  })
    .then((results) => {
      console.log('Success Creating BidStyle')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating BidStyle')
      return err
    })
