const scheduleServices = require('../../services/schedule')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerSchedule = async (req, res) => {
  const body = req.body
  const schedule = await scheduleServices.createSchedule(body)
  if (schedule) {
    res.status(STATUS_CODE.CREATED).json({
      status: 'success',
      message: '스케줄 정보 등록 성공',
      data: [schedule],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: '스케줄 정보 등록에 실패했습니다',
      data: [],
    })
  }
}
exports.getScheduleListByDate = async (req, res) => {
  const body = req.body
  const scheduleList = await scheduleServices.findAllScheduleByDate(body)
  if (scheduleList && scheduleList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '날짜별 스케줄 정보 목록 조회 성공',
      data: scheduleList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 날짜별 스케줄 정보 목록이 없습니다.',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getScheduleList = async (req, res) => {
  const scheduleList = await scheduleServices.findAllSchedule()
  if (scheduleList && scheduleList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '전체 스케줄 정보 목록 조회 성공',
      data: scheduleList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 전체 스케줄 정보 목록이 없습니다',
      data: [],
    })
  }
}
exports.getScheduleListByDesignerId = async (req, res) => {
  const { id } = req.params
  const scheduleList = await scheduleServices.findAllScheduleByDesignerId(id)
  if (scheduleList && scheduleList.length > 0) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '디자이너의 스케줄 정보 목록 조회 성공',
      data: scheduleList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 디자이너의 스케줄 정보 목록이 없습니다',
      data: [],
    })
  }
}

// [ 3. PATCH Methods ]
exports.patchSchedule = async (req, res) => {
  const { id } = req.params
  const body = req.body
  const patchedScheduleCount = await scheduleServices.updateSchedule(id, body)
  if (patchedScheduleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스케줄 정보 수정 성공',
      data: patchedScheduleCount,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '수정된 스케줄 정보가 없습니다',
      data: patchedScheduleCount,
    })
  }
}

// [ 4. DELETE Methods]
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params
  const deletedScheduleCount = await scheduleServices.destroySchedule(id)
  if (deletedScheduleCount) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: '스케줄 정보 삭제 성공',
      data: deletedScheduleCount,
    })
  } else {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: 'failed',
      message: '삭제할 스케줄 정보가 없습니다',
      data: deletedScheduleCount,
    })
  }
}
