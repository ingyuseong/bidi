const db = require('./db/proposal')

// Create Proposal Resource [create]
exports.createProposal = async (params) => {
  console.log(params)
  const proposal = await db.createProposal({ ...params })
  return proposal
}

// Read Proposal Resource [findOne, findAll]
exports.findOneProposal = async (proposalId) => {
  const proposal = await db.findOneProposal(proposalId)
  return proposal
}
exports.findOneProposalByUserId = async (userId) => {
  const proposal = await db.findOneProposalByUserId(userId)
  return proposal
}
exports.findAllProposal = async () => {
  const proposalList = await db.findAllProposal()
  return proposalList
}

// Update Proposal Resource [update]
exports.updateProposal = async (params) => {
  const proposal = await db.updateProposal({ ...params })
  return proposal
}
exports.updateMatchingStatus = async (params) => {
  const proposal = await db.updateMatchingStatus({ ...params })
  return proposal
}

// Delete Proposal Resoure [destroy]
exports.destroyProposal = async (proposalId) => {
  const proposal = await db.destroyProposal(proposalId)
  return proposal
}
