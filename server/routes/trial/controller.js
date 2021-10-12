const trialServices = require('../../services/trial')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerTrial = async (req, res) => {
  const body = req.body
  const trial = await trialServices.createTrial(body)
  if (trial) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party 이용 데이터 생성 성공',
      data: [trial],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: 'Third Party 이용 데이터 생성에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getTrialList = async (req, res) => {
  const trialList = await trialServices.findAllTrial()
  if (trialList) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party 이용 데이터 목록 조회 성공',
      data: trialList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 Third Party 이용 데이터 목록이 없습니다',
      data: [],
    })
  }
}
exports.getTrialCount = async (req, res) => {
  const trialList = await trialServices.countTrial()
  if (trialList) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party 이용 데이터 목록 조회 성공',
      data: trialList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 Third Party 이용 데이터 목록이 없습니다',
      data: 0,
    })
  }
}

// [ 3. PATCH Methods ]
/*
//
//
//
//
*/

// [ 4. DELETE Methods]
exports.deleteTrial = async (req, res) => {
  const body = req.body
  const deletedTrialCount = await trialServices.destroyTrial(body)
  if (deletedTrialCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party 이용 데이터 삭제 성공',
      data: deletedStyleScrapCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 Third Party 이용 데이터가 없습니다',
      data: deletedTrialCount,
    })
  }
}
