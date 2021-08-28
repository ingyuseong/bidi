const db = require('./db/proposal')
const { ERROR_MESSAGE } = require('../lib/constants')

// Create Proposal Resource [create]
exports.createProposal = async (body) => {
  try {
    const attr = {
      userId: body.user_id,
      before_src: body.before_src,
      after_src: body.after_src,
      price_limit: Number(body.price_limit),
      address: body.address,
      description: body.description,
      keyword_array: body.keyword_array,
    }
    const proposal = await db.createProposal(attr)
    if (proposal) {
      return proposal.dataValues
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Read Proposal Resource [findOne, findAll]
exports.findAllProposal = async () => {
  try {
    let proposalList = await db.findAllProposal()
    if (proposalList && proposalList.length > 0) {
      proposalList = proposalList.map((proposal) => {
        let keyword_array = []
        if (proposal.dataValues.keyword_array) {
          keyword_array = proposal.dataValues.keyword_array.split(',')
        }
        return {
          ...proposal.dataValues,
          keyword_array,
        }
      })
      return proposalList
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneProposal = async (id) => {
  try {
    let proposal = await db.findOneProposal(id)
    if (proposal) {
      let keyword_array = []
      if (keyword_array) {
        keyword_array = proposal.keyword_array.split(',')
      }
      proposal = {
        ...proposal.dataValues,
        keyword_array,
      }
      return proposal
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
exports.findOneProposalByUserId = async (id) => {
  try {
    let proposal = await db.findOneProposalByUserId(id)
    if (proposal) {
      let keyword_array = []
      if (keyword_array) {
        keyword_array = proposal.keyword_array.split(',')
      }
      proposal = {
        ...proposal.dataValues,
        keyword_array,
      }
      return proposal
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Update Proposal Resource [update]
exports.updateProposal = async (id, body) => {
  try {
    const attr = {
      before_src: body.before_src,
      after_src: body.after_src,
      price_limit: Number(body.price_limit),
      address: body.address,
      description: body.description,
      keyword_array: body.keyword_array,
    }
    const proposal = await db.updateProposal(id, attr)
    if (proposal) {
      return proposal
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}

// Delete Proposal Resoure [destroy]
exports.destroyProposal = async (id) => {
  try {
    const proposal = await db.destroyProposal(id)
    if (proposal) {
      return proposal
    } else {
      return null
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.SERVICES_ERROR)
    console.error(err)
    return null
  }
}
