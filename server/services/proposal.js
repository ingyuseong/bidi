const db = require('./db/proposal')

exports.getProposal = async (proposalId) => {
  const proposal = await db.selectProposal(proposalId)
  return proposal
}

exports.editProposal = async (params) => {
  const proposal = await db.updateProposal({ ...params })
  return proposal
}

exports.deleteProposal = async (proposalId) => {
  const proposal = await db.destroyProposal(proposalId)
  return proposal
}

exports.getProposals = async () => {
  const proposal = await db.selectAllProposal()
  return proposal
}

exports.registerProposal = async (params) => {
  const proposal = await db.insertProposal({ ...params })
  return proposal
}


// 제안서 keyword 관련 
exports.registerKeyword = async (keyword) => {
  const result = await db.insertKeyword(keyword)
  return result
}