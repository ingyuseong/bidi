const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'bid'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  proposal_id: {
    type: DataTypes.INTEGER,
  },
  customer_id: {
    type: DataTypes.INTEGER,
  },
  designer_id: {
    type: DataTypes.INTEGER,
  },
  style_type: {
    type: DataTypes.ENUM('cut', 'perm', 'color'),
  },
  length_type: {
    type: DataTypes.ENUM('long', 'medium', 'short'),
  },
  address: {
    type: DataTypes.STRING,
  },
  letter: {
    type: DataTypes.TEXT,
  },
  need_care: {
    type: DataTypes.BOOLEAN,
  },

  // Status Attribute
  matching: {
    type: DataTypes.BOOLEAN,
  },
  canceled: {
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
