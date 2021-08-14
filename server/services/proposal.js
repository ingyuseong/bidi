const db = require('./db/proposal')

exports.getProposal = async (proposalId) => {
  const proposal = await db.selectProposal(proposalId)
  return proposal
}

exports.getProposalByUserId = async (userId) => {
  const proposal = await db.selectProposalByUserId(userId)
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

exports.registerProposal = async (params) => {
  const proposal = await db.insertProposal({ ...params })
  return proposal
}

exports.getProposalList = async () => {
  let results = []
  const proposalList = await db.selectAllProposal()
  for await (const proposal of proposalList) {
    const result = {
      ...proposal,
      images: [proposal.before_src, proposal.after_src],
      keywords:
        proposal.keywords == ''
          ? []
          : proposal.keywords.replace(' ', '').split(','),
      name: proposal['user.name'],
      address: proposal['user.address'],
      img_src: proposal['user.img_src'],
    }
    results.push(result)
  }
  return results
}

exports.editProposalStatus = async (params) => {
  const proposal = await db.updateProposalStatus({ ...params })
  return proposal
}
