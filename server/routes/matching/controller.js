const matchingServices = require('../../services/matching')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerMatching = async (req, res, next) => {
  try {
    const body = req.body
    const matching = await matchingServices.createMatching(body)
    if (matching) {
      res.status(STATUS_CODE.CREATED).json({
        message: '매칭 생성 성공',
        data: matching,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '매칭 등록 실패',
        data: matching,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getMatching = async (req, res, next) => {
  try {
    const { id } = req.params
    const matching = await matchingServices.findOneMatching(id)
    if (matching) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 정보 조회 성공',
        data: matching,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '매칭 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getMatchingListByDesignerId = async (req, res, next) => {
  try {
    const proposalList = await matchingServices.findAllProposal()
    if (proposalList && proposalList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 매칭 목록 조회 성공',
        data: proposalList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 매칭 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getMatchingListByCustomerId = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await matchingServices.findOneProposalByUserId(id)
    if (proposal) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 매칭 정보 조회 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 매칭 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchMatching = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedProposalCount = await matchingServices.updateProposal(id, body)
    if (patchedProposalCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 상태 정보 수정 성공',
        data: patchedProposalCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 상태 정보 수정 실패(No resources or No change)',
        data: patchedProposalCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchMatchingStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedProposalCount = await matchingServices.updateMatchingStatus(
      id,
      body
    )
    if (patchedProposalCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 상태 정보 수정 성공',
        data: patchedProposalCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 상태 정보 수정 실패(No resources or No change)',
        data: patchedProposalCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.patchBidMatching = async (req, res, next) => {
  try {
    const { bid_id, customer_id } = req.body
    await bidServices.updateBidCancelElse({
      customerId: customer_id,
    })
    const bid = await bidServices.updateBidMatching({ bidId: bid_id })
    res.status(STATUS_CODE.SUCCESS).json({
      message: '비드 매칭 상태 수정 성공',
      data: { bid },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteMatching = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProposalCount = await matchingServices.destroyProposal(id)
    if (deletedProposalCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '매칭 정보 삭제 성공',
        data: deletedProposalCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '매칭 정보 삭제 실패(No resources)',
        data: deletedProposalCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
