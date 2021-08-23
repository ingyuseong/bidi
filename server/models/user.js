const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'user'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_type: {
    type: DataTypes.ENUM('customer', 'designer'),
  },
  naver_token: {
    type: DataTypes.STRING,
  },
  kakao_token: {
    type: DataTypes.STRING,
  },
  apple_token: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  nick_name: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  birth: {
    type: DataTypes.STRING,
  },
  gender_type: {
    type: DataTypes.ENUM('female', 'male'),
  },
  img_src: {
    type: DataTypes.STRING,
  },

  // Status Attributes
  authentication: {
    type: DataTypes.BOOLEAN,
  },
  ai_status: {
    type: DataTypes.BOOLEAN,
  },
  ai_process: {
    type: DataTypes.BOOLEAN,
  },
  ai_count: {
    type: DataTypes.INTEGER,
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
