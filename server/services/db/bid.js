const { Bid, BidStyle, User, Style, Proposal } = require('../../models')

// Create Bid Resource [create]
exports.createBid = async (attr) => {
  try {
    const bid = await Bid.create({
      raw: true,
      ...attr,
      matching: false,
      canceled: false,
    })
    return bid
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.createBidStyle = async (attr) => {
  try {
    const bidStyle = await BidStyle.create({
      raw: true,
      ...attr,
    })
    return bidStyle
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllBidByCustomerId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneBid = async (id) =>
  await Bid.findOne({
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
exports.updateBidMatching = async (id) => {
  try {
    const bid = await Bid.update(
      {
        matching: true,
        canceled: false,
      },
      {
        where: {
          id,
        },
      }
    )
    return bid[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateBidCanceled = async (id, canceled) =>
  await Bid.update(
    {
      raw: true,
      canceled: true,
    },
    {
      where: {
        id,
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
exports.updateBidCancelElseByCustomerId = async (id) => {
  try {
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
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

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
