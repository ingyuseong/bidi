exports.routesAsyncWrapper = (asyncFn) => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next)
  } catch (err) {
    // logging 추가 필요!
    console.error('Routes Error')
    console.error(err.stack)

    next(err) // error를 error handling middleware로 전송
  }
}

exports.servicesAsyncWrapper = async (asyncFn, parmas) => {
  try {
    const result = await asyncFn(params)
    console.log(result)
    return result
  } catch (err) {
    console.error('Services Error')
    console.error(err.stack)
    return null
  }
}
