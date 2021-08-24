const { Bid, BidStyle, User, Style, Proposal } = require('../../models')

// Create Bid Resource [create]
exports.createBid = async ({
  proposal_id,
  customer_id,
  designer_id,
  style_type,
  length_type,
  letter,
  need_care,
}) =>
  await Bid.create({
    raw: true,
    proposalId: proposal_id,
    customer_id,
    designer_id,
    style_type,
    length_type,
    letter,
    need_care,
    matching: false,
    canceled: false,
  })
    .then((results) => {
      console.log('Success Creating Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Bid')
      return err
    })

exports.createBidStyle = async (bidId, styleId) =>
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

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (userId) =>
  await Bid.findAll({
    where: {
      designer_id: userId,
      matching: false,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Style,
        as: 'bidStyles',
        through: {
          model: BidStyle,
        },
      },
    ],
    order: [['created_at', 'DESC']],
  })
    .then((results) => {
      console.log('Success find All Bid By Designer ID')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed find All Bid By Designer ID')
      return err
    })
exports.findAllBidByCustomerId = async (userId) =>
  await Bid.findAll({
    where: {
      customer_id: userId,
      matching: false,
      canceled: false,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Style,
        as: 'bidStyles',
        through: {
          model: BidStyle,
        },
      },
    ],
    order: [['created_at', 'DESC']],
  })
    .then((results) => {
      console.log('Success find All Bid By Customer ID')
      return results
    })
    .catch((err) => {
      console.log('Failed find All Bid By Customer ID')
      return err
    })
exports.findOneBid = async (id) =>
  await Bid.findOne({
    where: {
      id,
      matching: false,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
        required: true,
      },
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
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
      console.log('Success find One Bid')
      return results
    })
    .catch((err) => {
      console.log('Failed find One Bid')
      return err
    })

// Update Bid Resource [update]
exports.updateBid = async ({
  id,
  style_type,
  length_type,
  letter,
  need_care,
  matching,
  canceled,
}) =>
  await Bid.update(
    {
      raw: true,
      style_type,
      length_type,
      letter,
      need_care,
      matching,
      canceled,
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
exports.updateBidMatching = async ({ bidId }) =>
  await Bid.update(
    {
      raw: true,
      matching: true,
      canceled: false,
    },
    {
      where: {
        id: bidId,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid Matching Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Bid Matching Status')
      return err
    })
exports.updateBidCanceled = async ({ bidId, canceled }) =>
  await Bid.update(
    {
      raw: true,
      canceled: true,
    },
    {
      where: {
        id: bidId,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid Canceled Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Bid Canceled Status')
      return err
    })
exports.updateBidCancelElse = async ({ customerId }) =>
  await Bid.update(
    {
      raw: true,
      canceled: true,
    },
    {
      where: {
        customer_id: customerId,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Bid Canceled Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Bid Canceled Status')
      return err
    })

// Delete Bid Resource [destroy]
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
