const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'branding'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  shop_name: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  keyword_array: {
    type: DataTypes.STRING,
  },

  // Status Attribute
  main: {
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
