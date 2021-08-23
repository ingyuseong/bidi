const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'style'

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
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  gender_type: {
    type: DataTypes.ENUM('female', 'male'),
  },
  style_type: {
    type: DataTypes.ENUM('cut', 'perm', 'color'),
  },
  length_type: {
    type: DataTypes.ENUM('long', 'medium', 'short'),
  },
  keyword_array: {
    type: DataTypes.STRING,
  },
  img_src_array: {
    type: DataTypes.STRING,
  },

  // Status Attribute
  ai_enable: {
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
