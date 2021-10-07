const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'message'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_id: {
    type: DataTypes.INTEGER,
  },
  sender_id: {
    type: DataTypes.INTEGER,
  },
  unread: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
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
