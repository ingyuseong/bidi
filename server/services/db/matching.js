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
    })
    return matchingList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

exports.findOneProposalByUserId = async (id) => {
  try {
    const proposal = await Proposal.findOne({
      where: {
        user_id: id,
        matching: false,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
          required: true,
        },
      ],
    })
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

exports.findAllProposal = async () => {
  try {
    const proposalList = await Proposal.findAll({
      where: {
        matching: false,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
          required: true,
        },
      ],
    })
    return proposalList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}

// Update Proposal Resource [update]
exports.updateProposal = async (id, body) => {
  try {
    const proposal = await Proposal.update(
      {
        raw: true,
        ...body,
      },
      {
        where: {
          id,
        },
      }
    )
    return proposal[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateMatchingStatus = async (id, matching) => {
  try {
    const proposal = await Proposal.update(
      {
        matching,
      },
      {
        where: {
          id,
        },
      }
    )
    return proposal[0]
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
