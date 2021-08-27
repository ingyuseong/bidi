const {
  Matching,
  Bid,
  Proposal,
  BidStyle,
  Style,
  User,
} = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')

// Create Matching Resource [create]
exports.createMatching = async (attr) => {
  try {
    const matching = await Matching.create({
      raw: true,
      ...attr,
      styling_at: null,
      review: null,
      star: 0,
      done: false,
      canceled: false,
    })
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}
// Read Matching Resource [findOne, findAll]
exports.findAllMatching = async () => {
  try {
    const matchingList = await Matching.findAll({
      include: [
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
          model: Bid,
          required: true,
          include: [
            {
              model: User,
              attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
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
        },
      ],
      order: [['updated_at', 'DESC']],
    })
    return matchingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllMatchingByDesignerId = async (id) => {
  try {
    const matchingList = await Matching.findAll({
      where: {
        designer_id: id,
      },
      include: [
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
          model: Bid,
          required: true,
          include: [
            {
              model: User,
              attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
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
        },
      ],
      order: [['updated_at', 'DESC']],
    })
    return matchingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findAllMatchingByCustomerId = async (id) => {
  try {
    const matchingList = await Matching.findAll({
      where: {
        customer_id: id,
      },
      include: [
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
          model: Bid,
          required: true,
          include: [
            {
              model: User,
              attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
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
        },
      ],
      order: [['updated_at', 'DESC']],
    })
    return matchingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneMatching = async (id) => {
  try {
    const matching = await Matching.findOne({
      where: {
        id,
      },
      include: [
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
          model: Bid,
          required: true,
          include: [
            {
              model: User,
              attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
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
        },
      ],
    })
    return matching
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Update Proposal Resource [update]
exports.updateMatchingTime = async (id, time) => {
  try {
    const matching = await Matching.update(
      {
        raw: true,
        time,
      },
      {
        where: {
          id,
        },
      }
    )
    return matching[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingReview = async (id, review) => {
  try {
    const matching = await Matching.update(
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
    return matching[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingStar = async (id, star) => {
  try {
    const matching = await Matching.update(
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
    return matching[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingDone = async (id, done) => {
  try {
    const matching = await Matching.update(
      {
        raw: true,
        done,
      },
      {
        where: {
          id,
        },
      }
    )
    return matching[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingCanceled = async (id, canceled) => {
  try {
    const matching = await Matching.update(
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
    return matching[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}

// Delete Proposal Resource [destroy]
exports.destroyProposal = async (id) => {
  try {
    const proposal = await Proposal.destroy({
      where: {
        id,
      },
    })
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_DELETE_ERROR)
    console.error(err)
    return null
  }
}
