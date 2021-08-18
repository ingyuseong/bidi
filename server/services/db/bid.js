const { Bid, BidStyle, User, Style, Proposal } = require('../../models')

exports.updateBid = async ({
  id,
  large_category,
  small_category,
  letter,
  need_care,
  status,
}) =>
  await Bid.update(
    {
      raw: true,
      large_category,
      small_category,
      letter,
      need_care,
      status,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Bid')
      return err
    })

exports.updateBidStatus = async ({ id, status }) =>
  await Bid.update(
    {
      raw: true,
      status,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid Status')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Bid Status')
      return err
    })

exports.updateBidStatusWithProposal = async ({ proposalId, status }) =>
  await Bid.update(
    {
      raw: true,
      status,
    },
    {
      where: {
        proposal_id: proposalId,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid Status')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Bid Status')
      return err
    })

exports.destroyBid = async (bidId) =>
  await Bid.destroy({
    where: {
      id: bidId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Bid')
      return err
    })

exports.selectAllBidByDesignerId = async (userId) =>
  await Bid.findAll({
    where: {
      designer_id: userId,
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'img_src', 'address'],
            required: true,
          },
        ],
      },
    ],
    order: [['created_at', 'ASC']],
  })
    .then((results) => {
      console.log('Success Selecting All Bid')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Selecting All Bid')
      return err
    })

exports.selectAllBidByCustomerId = async (userId) =>
  await Bid.findAll({
    where: {
      customer_id: userId,
    },
    include: [
      {
        model: Proposal,
        required: true,
      },
      {
        model: Style,
        as: 'bidStyles',
        through: {
          model: BidStyle,
        },
      },
    ],
  })
    .then((results) => {
      console.log('Success Selecting All Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All Bid')
      return err
    })

// DM
exports.selectAllDMBidByCustomerId = async (userId) =>
  await Bid.findAll({
    where: {
      customer_id: userId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'img_src', 'address'],
        required: false,
      },
    ],
  })
    .then((results) => {
      console.log('Success Selecting DM All Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting DM All Bid')
      return err
    })

exports.selectBidByCustomerId = async (bidId) =>
  await Bid.findOne({
    where: {
      id: bidId,
    },
    include: [
      {
        model: Style,
        as: 'bidStyles',
        through: {
          model: BidStyle,
        },
      },
    ],
  })
    .then((results) => {
      console.log('Success Selecting One Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting One Bid')
      return err
    })

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
    proposalId: proposal_id,
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
      console.log(err)
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
