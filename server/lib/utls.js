const extractUrl = (data, existData = '') => {
  if (existData) {
    return existData
  }
  if (data) {
    return data[0].location
  }
  return ''
}
module.exports = { extractUrl }
