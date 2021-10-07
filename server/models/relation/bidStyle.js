const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'bidStyle'

const modelAttributes = {}

const modelOptions = {
  timestamps: false,
  charset: 'utf8',
  tableName: modelName,
  underscored: true,
}

module.exports = (sequelize) => {
  // model 설정
  const model = sequelize.define(modelName, modelAttributes, modelOptions)
  return model
}
