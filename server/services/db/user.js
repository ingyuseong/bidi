const { User } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

exports.selectUser = async (userId) => {
  const results = await User.findOne({
    raw: true,
    where: {
      id: userId,
    },
  })

  return results
}

exports.selectUserByToken = async (token) => {
  const results = await User.findOne({
    raw: true,
    where: {
      [or]: [{ naver_token: token }, { kakao_token: token }],
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
  gender,
  birth,
  phone_number,
  nick_name,
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
    gender,
    nick_name,
    birth,
    phone_number,
  })
  return results
}
