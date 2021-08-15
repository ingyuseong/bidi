const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'user'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
  },
  naver_token: {
    type: DataTypes.STRING,
  },
  kakao_token: {
    type: DataTypes.STRING,
  },
  nick_name: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  birth: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
  img_src: {
    type: DataTypes.STRING,
  },
  ai_status: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
}

const modelOptions = {
  timestamps: false,
  charset: 'utf8',
  tableName: modelName,
  underscored: true,
}

module.exports = (sequelize) => {
  // model 설정
  const model = sequelize.define(modelName, modelAttributes, modelOptions)
  // 외래키 설정
  return model
}
