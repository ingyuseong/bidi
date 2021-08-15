const branding = require('../models/branding')
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
    const {
      id,
      user_id,
      before_src,
      after_src,
      price_limit,
      distance_limit,
      keywords,
      description,
      status,
      created_at,
    } = proposal
    const result = {
      id,
      user_id,
      user: proposal.user.dataValues,
      images: [proposal.before_src, proposal.after_src],
      before_src,
      after_src,
      price_limit,
      distance_limit,
      keywords: keywords == '' ? [] : keywords.replace(' ', '').split(','),
      description,
      status,
      created_at,
    }
    results.push(result)
  }
  return results
}
