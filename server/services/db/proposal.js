const { Proposal, User } = require('../../models')

// Create Proposal Resource [create]
exports.createProposal = async ({
  user_id,
  before_src,
  after_src,
  price_limit,
  address,
  description,
  keyword_array,
}) => {
  await Proposal.create({
    raw: true,
    userId: user_id,
    before_src,
    after_src,
    price_limit,
    address,
    description,
    keyword_array,
    matching: false,
  })
    .then((results) => {
      console.log('Success Creating Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Proposal')
      console.log(err)
      return err
    })
}
// Read Proposal Resource [findOne, findAll]
exports.findOneProposal = async (proposalId) =>
  await Proposal.findOne({
    raw: true,
    where: {
      id: proposalId,
    },
  })
    .then((results) => {
      console.log('Success Selecting Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting Proposal')
      return err
    })

exports.findOneProposalByUserId = async (userId) =>
  await Proposal.findOne({
    raw: true,
    where: {
      user_id: userId,
      matching: false,
    },
  })
    .then((results) => {
      console.log('Success Selecting Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting Proposal')
      return err
    })

exports.findAllProposal = async () =>
  await Proposal.findAll()
    .then((results) => {
      console.log('Success Selecting All Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All Proposal')
      return err
    })

// Update Proposal Resource [update]
exports.updateProposal = async ({
  id,
  before_src,
  after_src,
  price_limit,
  address,
  description,
  keyword_array,
  matching,
}) => {
  await Proposal.update(
    {
      raw: true,
      before_src,
      after_src,
      price_limit,
      address,
      description,
      keyword_array,
      matching,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Proposal')
      return err
    })
}

exports.updateMatchingStatus = async ({ id, matching }) => {
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
      console.log('Success Updating Proposal Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Proposal Status')
      return err
    })
}

// Delete Proposal Resource [destroy]
exports.destroyProposal = async (proposalId) => {
  console.log(proposalId)
  await Proposal.destroy({
    where: {
      id: proposalId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Proposal')
      return err
    })
}
