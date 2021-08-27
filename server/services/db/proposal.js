const { Proposal, User } = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')

// Create Proposal Resource [create]
exports.createProposal = async (attr) => {
  try {
    const proposal = await Proposal.create({
      raw: true,
      ...attr,
      matching: false,
    })
    return proposal
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}

// Read Proposal Resource [findOne, findAll]
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
      order: [['updated_at', 'DESC']],
    })
    return proposalList
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneProposal = async (id) => {
  try {
    const proposal = await Proposal.findOne({
      where: {
        id,
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

// Update Proposal Resource [update]
exports.updateProposal = async (id, attr) => {
  try {
    const proposal = await Proposal.update(
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
    return proposal[0]
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
    console.error(err)
    return null
  }
}
exports.updateProposalMatching = async (id) => {
  try {
    const proposal = await Proposal.update(
      {
        matching: true,
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
