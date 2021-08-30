const { Proposal, User } = require('../../models')

// Create Proposal Resource [create]
exports.createProposal = async (attr) => {
  const proposal = await Proposal.create({
    raw: true,
    ...attr,
    matching: false,
  })
  return proposal
}

// Read Proposal Resource [findOne, findAll]
exports.findAllProposal = async () => {
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
}
exports.findOneProposal = async (id) => {
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
}
exports.findOneProposalByUserId = async (id) => {
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
}

// Update Proposal Resource [update]
exports.updateProposal = async (id, attr) => {
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
}
exports.updateProposalMatching = async (id) => {
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
}

// Delete Proposal Resource [destroy]
exports.destroyProposal = async (id) => {
  const proposal = await Proposal.destroy({
    where: {
      id,
    },
  })
  return proposal
}
