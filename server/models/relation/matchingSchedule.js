const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'matchingSchedule'

const modelAttributes = {
  time: DataTypes.FLOAT,
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
  return model
}
