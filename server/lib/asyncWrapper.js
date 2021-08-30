exports.routesAsyncWrapper = (asyncFn) => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next)
  } catch (err) {
    console.error(err.message)
    // console.error(err.stack) // console logging이 아닌 elastic search 등의 툴 추가 필요!
    next(err) // error를 error handling middleware로 전송
  }
}
