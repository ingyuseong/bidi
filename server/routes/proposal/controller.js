const proposalServices = require('../../services/proposal')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerProposal = async (req, res, next) => {
  try {
    const {
      user_id,
      before_src,
      after_src,
      price_limit,
      address,
      description,
      keyword_array,
    } = req.body
    const proposal = {
      user_id,
      before_src,
      after_src,
      price_limit: Number(price_limit),
      address,
      description,
      keyword_array,
    }
    const result = await proposalServices.createProposal(proposal)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 등록 성공',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.registerWithFile = async (req, res, next) => {
  try {
    const {
      user_id,
      before_src,
      price_limit,
      address,
      description,
      keyword_array,
    } = req.body
    const { location } = req.file
    const proposal = {
      user_id,
      before_src,
      after_src: location,
      price_limit: Number(price_limit),
      address,
      description,
      keyword_array,
    }
    const result = await proposalServices.createProposal(proposal)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 등록 성공',
      data: result.id,
    })
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    let proposal = await proposalServices.findOneProposal(id)
    if (proposal) {
      proposal = {
        ...proposal,
        keyword_array: proposal.keyword_array.split(','),
      }
      res.status(STATUS_CODE.SUCCESS).json({
        message: '제안서 정보 조회 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getProposalByUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    let proposal = await proposalServices.findOneProposalByUserId(id)
    if (proposal) {
      proposal = {
        ...proposal,
        keyword_array: proposal.keyword_array.split(','),
      }
      res.status(STATUS_CODE.SUCCESS).json({
        message: '제안서 정보 조회 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getProposalList = async (req, res, next) => {
  try {
    let proposalList = await proposalServices.findAllProposal()
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
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 제안서 목록 조회 성공',
        data: proposalList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchProposal = async (req, res, next) => {
  try {
    const params = req.body
    const proposal = await proposalServices.updateProposal(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 정보 수정 성공',
      data: proposal,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

exports.patchMatchingStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = req.body
    const proposal = await proposalServices.updateMatchingStatus({
      ...params,
      id,
    })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 상태 정보 수정 성공',
      data: { proposal },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await proposalServices.destroyProposal(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 정보 삭제 성공',
      data: proposal,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
