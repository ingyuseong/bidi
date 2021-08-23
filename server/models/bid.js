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
    type: DataTypes.STRING,
    validate: {
      checkStyleType(inputStyleType) {
        if (
          !(inputStyleType == 'cut') ||
          !(inputStyleType == 'perm') ||
          !(inputStyleType == 'color')
        ) {
          throw new Error('스타일 형식이 맞지 않습니다.')
        }
      },
    },
  },
  length_type: {
    type: DataTypes.STRING,
    validate: {
      checkLength(inputLength) {
        if (
          !(inputLength == 'long') ||
          !(inputLength == 'medium') ||
          !(inputLength == 'short')
        ) {
          throw new Error('길이 형식이 맞지 않습니다.')
        }
      },
    },
  },
  letter: {
    type: DataTypes.TEXT,
  },
  needCare: {
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
}

module.exports = (sequelize) => {
  // model 설정
  const model = sequelize.define(modelName, modelAttributes, modelOptions)
  return model
}
