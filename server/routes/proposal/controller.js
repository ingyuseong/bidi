const proposalServices = require('../../services/proposal')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerProposal = async (req, res) => {
  const body = req.body
  const proposal = await proposalServices.createProposal(body)
  if (proposal) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '제안서 등록 성공',
      data: proposal,
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '제안서 등록에 실패했습니다',
      data: {},
    })
  }
}
exports.registerWithFile = async (req, res) => {
  const { location } = req.file
  const body = {
    ...req.body,
    after_src: location,
  }
  const proposal = await proposalServices.createProposal(body)
  if (proposal) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '제안서 등록 성공',
      data: proposal,
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '제안서 등록에 실패했습니다',
      data: proposal,
    })
  }
}

// [ 2. GET Methods ]
exports.getProposalList = async (req, res) => {
  const proposalList = await proposalServices.findAllProposal()
  if (proposalList && proposalList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 제안서 목록 조회 성공',
      data: proposalList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 제안서 목록이 없습니다',
      data: [],
    })
  }
}
exports.getProposal = async (req, res) => {
  const { id } = req.params
  const proposal = await proposalServices.findOneProposal(id)
  if (proposal) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '제안서 정보 조회 성공',
      data: proposal,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 제안서 정보가 없습니다',
      data: {},
    })
  }
}
exports.getProposalByUserId = async (req, res) => {
  const { id } = req.params
  const proposal = await proposalServices.findOneProposalByUserId(id)
  if (proposal) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '유저의 제안서 정보 조회 성공',
      data: proposal,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 유저의 제안서 정보가 없습니다',
      data: {},
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchProposal = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedProposalCount = await proposalServices.updateProposal(id, body)
  if (patchedProposalCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '제안서 상태 정보 수정 성공',
      data: patchedProposalCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 제안서 상태 정보가 없습니다',
      data: patchedProposalCount,
    })
  }
}
exports.patchWithFile = async (req, res) => {
  const { id } = req.params
  const { location } = req.file
  console.log(location)
  const body = {
    ...req.body,
    after_src: location,
  }
  const patchedProposalCount = await proposalServices.updateProposal(id, body)
  if (patchedProposalCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '제안서 상태 정보 수정 성공',
      data: patchedProposalCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 제안서 상태 정보가 없습니다',
      data: patchedProposalCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteProposal = async (req, res) => {
  const { id } = req.params
  const deletedProposalCount = await proposalServices.destroyProposal(id)
  if (deletedProposalCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '제안서 정보 삭제 성공',
      data: deletedProposalCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 제안서 정보가 없습니다',
      data: deletedProposalCount,
    })
  }
}
