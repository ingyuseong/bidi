const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'trial'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gender: {
    type: DataTypes.ENUM('female', 'male'),
  },
  length: {
    type: DataTypes.ENUM('long', 'medium', 'short'),
  },
  bang: {
    type: DataTypes.ENUM('bang', 'none'),
  },
  share: {
    type: DataTypes.BOOLEAN,
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
