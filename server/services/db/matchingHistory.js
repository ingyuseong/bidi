const { MatchingHistory, Bid, Proposal, User } = require('../../models')

exports.destroyMatchingHistory = async (matchingHistroyId) =>
  await MatchingHistory.destroy({
    where: {
      id: matchingHistroyId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Matching History')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Matching History')
      return err
    })

exports.selectAllMatchingHistoryByDesignerId = async (userId) =>
  await MatchingHistory.findAll({
    where: {
      designer_id: userId,
    },
    include: [
      {
        model: Bid,
        required: true,
      },
      {
        model: Proposal,
        required: true,
      },
    ],
  })
    .then((results) => {
      console.log('Success Selecting All MatchingHistory')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All MatchingHistory')
      return err
    })

exports.selectAllMatchingHistoryByCustomerId = async (userId) =>
  await MatchingHistory.findAll({
    where: {
      customer_id: userId,
    },
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Bid,
        required: true,
      },
      {
        model: Proposal,
        required: true,
      },
    ],
  })
    .then((results) => {
      console.log('Success Selecting All Matching History')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All Matching History')
      return err
    })

exports.insertMatchingHistory = async ({
  bid_id,
  customer_id,
  designer_id,
  proposal_id,
}) =>
  await MatchingHistory.create({
    raw: true,
    bid_id,
    customer_id,
    designer_id,
    proposal_id,
    review: '',
    star: 0,
  })
    .then((results) => {
      console.log('Success Creating Matching History')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Matching History')
      return err
    })

exports.updateReview = async ({ id, review }) =>
  await MatchingHistory.update(
    {
      raw: true,
      review,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Review')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Review')
      return err
    })

exports.updateStar = async ({ id, star }) =>
  await MatchingHistory.update(
    {
      raw: true,
      star,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Star')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Star')
      return err
    })
