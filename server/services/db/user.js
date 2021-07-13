const { User } = require('../../models')

exports.selectUser = async (userId) => {
  const results = await User.findOne({
    raw: true,
    where: {
      id: userId,
    },
  })

  return results
}

exports.updateUser = async ({
  id,
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
  const results = await User.update({
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
    where: {
      id,
    },
  })

  return results
}

exports.destroyUser = async (userId) => {
  const results = await User.destroy({
    where: {
      id: userId,
    },
  })

  return results
}

exports.selectAllUser = async () => {
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
