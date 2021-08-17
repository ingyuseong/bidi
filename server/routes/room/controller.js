const roomServices = require('../../services/room')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/room/customer/:userId
    * 고객 ID 기반 room 조회
*/
exports.getAllRoomByCustomerId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const roomList = await roomServices.getAllRoomByCustomerId(userId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '채팅방 조회 성공',
      data: { roomList },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}