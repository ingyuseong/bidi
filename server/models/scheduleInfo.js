const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'scheduleInfo'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  designer_id: {
    type: DataTypes.INTEGER,
  },
  start_time: {
    type: DataTypes.FLOAT,
  },
  end_time: {
    type: DataTypes.FLOAT,
  },
  holiday_array: {
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
  return model
}
