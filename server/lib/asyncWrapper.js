const { slack } = require('./slack')

const reorganizeErrorMessage = (req, err) => {
  return JSON.stringify({
    ip: req.ip,
    url: req.originalUrl,
    errorCode: err.code,
    errorMessage: err.message,
    errorStack: err.stack
  }, null, 2)
}

exports.routesAsyncWrapper = (asyncFn) => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next)
  } catch (err) {
    console.error(err.message)
    console.error(err.stack) // console logging이 아닌 elastic search 등의 툴 추가 필요!
    slack.writeLogAndSendAlert(reorganizeErrorMessage(req, err))
    next(err) // error를 error handling middleware로 전송
  }
}
