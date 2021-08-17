const messageServices = require('../../services/message')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

/*
    GET /api/message/latest/:roomId
    * room ID 기반 가장 최근 message 조회
*/
exports.getAllRoomByCustomerId = async (req, res, next) => {
  try {
    const { roomId } = req.params
    const latestMessage = await messageServices.getLatestMessage(roomId)
    res.status(STATUS_CODE.SUCCESS).json({
      message: '채팅방 조회 성공',
      data: { latestMessage },
    })
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}