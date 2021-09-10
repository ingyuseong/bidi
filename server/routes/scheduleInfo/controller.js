const scheduleInfoServices = require('../../services/scheduleInfo')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerScheduleInfo = async (req, res) => {
  const body = req.body
  const scheduleInfo = await scheduleInfoServices.createScheduleInfo(body)
  if (scheduleInfo) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '스케줄 정보 등록 성공',
      data: [scheduleInfo],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '스케줄 정보 등록에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getScheduleInfoList = async (req, res) => {
  const scheduleInfoList = await scheduleInfoServices.findAllScheduleInfo()
  if (scheduleInfoList && scheduleInfoList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 스케줄 정보 목록 조회 성공',
      data: scheduleInfoList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 스케줄 정보 목록이 없습니다',
      data: [],
    })
  }
}
exports.getScheduleInfoByDesignerId = async (req, res) => {
  const { id } = req.params
  const scheduleInfo =
    await scheduleInfoServices.findOneScheduleInfoByDesignerId(id)
  if (scheduleInfo) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 스케줄 정보 조회 성공',
      data: [scheduleInfo],
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 스케줄 정보가 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchScheduleInfo = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedScheduleInfoCount =
    await scheduleInfoServices.updateScheduleInfo(id, body)
  if (patchedScheduleInfoCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스케줄 정보 수정 성공',
      data: patchedScheduleInfoCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 스케줄 정보가 없습니다',
      data: patchedScheduleInfoCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteScheduleInfo = async (req, res) => {
  const { id } = req.params
  const deletedScheduleInfoCount =
    await scheduleInfoServices.destroyScheduleInfo(id)
  if (deletedScheduleInfoCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스케줄 정보 삭제 성공',
      data: deletedScheduleInfoCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 스케줄 정보가 없습니다',
      data: deletedScheduleInfoCount,
    })
  }
}
