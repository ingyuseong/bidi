const proposalServices = require('../../services/proposal')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/proposal/:id
    * 제안서 정보 조회 API
*/
exports.getProposal = async (req, res, next) => {
  try {
    const { proposalId } = req.params
    const proposal = await proposalServices.getProposal(proposalId)

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

exports.getProposalByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const proposal = await proposalServices.getProposalByUserId(userId)

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
const image_upload_S3 = (img) => {
  return "S3://uploaded.png"
}

exports.registerProposal = async (req, res, next) => {
  try { 
    const { user_id, before_img, after_img, price_limit, distance_limit, keywords, description, status} = req.body
    const proposal = {
      user_id,
      before_src: image_upload_S3(before_img),
      after_src: image_upload_S3(after_img),
      price_limit: Number(price_limit),
      distance_limit: Number(distance_limit),
      keywords,
      description,
      status
    }
    const result = await proposalServices.registerProposal(proposal)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '제안서 등록 성공',
      data: result.id,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}