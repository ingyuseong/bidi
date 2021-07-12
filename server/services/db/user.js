const { User } = require('../../models')

exports.selectUser = async (userId) => {
  const results = await User.findAll({
    raw: true,
  })

  return results
}

exports.insertUser = async ({
  type,
  naver_token,
  kakao_token,
  name,
  email,
  address,
  lat,
  lng,
  img_src,
}) => {
  const results = await User.create({
    raw: true,
    type,
    naver_token,
    kakao_token,
    name,
    email,
    address,
    lat,
    lng,
    img_src,
  })
  return results
}
