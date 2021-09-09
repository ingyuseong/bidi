const extractUrl = (data) => {
  if (data) {
    return data[0].location
  }
  return ''
}
module.exports = { extractUrl }
