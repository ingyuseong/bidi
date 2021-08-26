const { Proposal, User } = require('../../models')
const { ERROR_MESSAGE } = require('../../lib/constants')

// Create Proposal Resource [create]
exports.createProposal = async (attr) => {
  await Proposal.create({
    raw: true,
    ...attr,
    matching: false,
  })
    .then((results) => {
      return results
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
      throw err
    })
}

// Read Proposal Resource [findOne, findAll]
exports.findOneProposal = async (id) =>
  await Proposal.findOne({
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
    .then((results) => {
      return results
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
      throw err
    })
exports.findOneProposalByUserId = async (id) =>
  await Proposal.findOne({
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
    .then((results) => {
      return results
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
      throw err
    })
exports.findAllProposal = async () =>
  await Proposal.findAll({
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
    .then((results) => {
      return results
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_READ_ERROR)
      throw err
    })

// Update Proposal Resource [update]
exports.updateProposal = async (id, body) =>
  await Proposal.update(
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
    .then((results) => {
      return results[0]
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
      throw err
    })
exports.updateMatchingStatus = async (id, matching) =>
  await Proposal.update(
    {
      matching,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      return results[0]
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_UPDATE_ERROR)
      throw err
    })

// Delete Proposal Resource [destroy]
exports.destroyProposal = async (id) =>
  await Proposal.destroy({
    where: {
      id,
    },
  })
    .then((results) => {
      return results[0]
    })
    .catch((err) => {
      console.error(ERROR_MESSAGE.SEQUELIZE_DELETE_ERROR)
      throw err
    })
