const proposalServices = require('../../services/proposal')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/proposal/:id
    * 제안서 정보 조회 API
*/
exports.getProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await proposalServices.getProposal(id)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 정보 조회 성공',
      data: proposal,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    PATCH /api/proposal/:id
    * 제안서 정보 수정 API
*/
exports.editProposal = async (req, res, next) => {
  try {
    const params = req.params
    const proposal = await proposalServices.editProposal(params)

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

/*
    DELETE /api/proposal/:id
    * 제안서 정보 삭제 API
*/
exports.deleteProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await proposalServices.deleteProposal(id)

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

/*
    GET /api/proposal/list
    * 전체 제안서 목록 조회 API
*/
exports.getProposals = async (req, res, next) => {
  try {
    const proposals = await proposalServices.getProposals()

    res.status(STATUS_CODE.SUCCESS).json({
      message: '전체 제안서 목록 조회 성공',
      data: proposals,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

/*
    POST /api/proposal/register
    * 제안서 등록 API
*/
exports.registerProposal = async (req, res, next) => {
  try {
    const params = req.body
    const proposal = await proposalServices.registerProposal(params)

    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 등록 성공',
      data: proposal.id,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}


/*
  제안서 키워드 등록관련
*/
exports.registerKeyword = async (req, res, next) => {
  try {
    const keyword = await proposalServices.registerKeyword("저에게 어울리는 다른 스타일도 괜찮아요")
    res.status(STATUS_CODE.SUCCESS).json({
      message: '키워드 등록 성공',
      data: keyword.id,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}