const { Bid, BidStyle, User, Style, Proposal } = require('../../models')

// Create Bid Resource [create]
exports.createBid = async (attr) => {
  const bid = await Bid.create({
    raw: true,
    ...attr,
    matching: false,
    canceled: false,
  })
  return bid
}
exports.createBidStyle = async (attr) => {
  const bidStyle = await BidStyle.create({
    raw: true,
    ...attr,
  })
  return bidStyle
}

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (id) => {
  const bidList = await Bid.findAll({
    where: {
      designer_id: id,
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
    order: [['updated_at', 'DESC']],
  })
  return bidList
}
exports.findAllBidByCustomerId = async (id) => {
  const bidList = await Bid.findAll({
    where: {
      customer_id: id,
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
    order: [['updated_at', 'DESC']],
  })
  return bidList
}
exports.findOneBid = async (id) => {
  const bid = await Bid.findOne({
    where: {
      id,
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
  return bid
}

// Update Bid Resource [update]
exports.updateBid = async (id, attr) => {
  const bid = await Bid.update(
    {
      raw: true,
      ...attr,
    },
    {
      where: {
        id,
      },
    }
  )
  return bid[0]
}
exports.updateBidMatching = async (id) => {
  const bid = await Bid.update(
    {
      matching: true,
      canceled: false,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  )
  return bid[0]
}
exports.updateBidCanceled = async (id, canceled) => {
  const bid = await Bid.update(
    {
      raw: true,
      canceled,
    },
    {
      where: {
        id,
      },
    }
  )
  return bid[0]
}
exports.updateBidCancelElseByCustomerId = async (id) => {
  const bid = await Bid.update(
    {
      raw: true,
      canceled: true,
    },
    {
      where: {
        customer_id: id,
      },
    }
  )
  return bid[0]
}

// Delete Bid Resource [destroy]
exports.destroyBid = async (id) => {
  const bid = await Bid.destroy({
    where: {
      id,
    },
  })
  return bid
}
