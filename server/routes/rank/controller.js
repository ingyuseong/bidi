const rankServices = require('../../services/rank')
const { STATUS_CODE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerRank = async (req, res) => {
  const body = req.body
  const rank = await rankServices.createRank(body)
  if (rank) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party Rank 집계 등록 완료',
      data: [rank],
    })
  } else {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      status: 'failed',
      message: 'Third Party Rank 집계 등록에 실패했습니다',
      data: [],
    })
  }
}

// [ 2. GET Methods ]
exports.getRankResult = async (req, res) => {
  const { type } = req.params
  const rankList = await rankServices.findAllRankByType(type)
  if (rankList) {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'success',
      message: 'Third Party Rank 목록 조회 성공',
      data: rankList,
    })
  } else {
    res.status(STATUS_CODE.SUCCESS).json({
      status: 'empty',
      message: '조회할 Third Party Rank 목록이 없습니다',
      data: [],
    })
  }
}


// [ 3. PATCH Methods ]


// [ 4. DELETE Methods]
