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
    type: DataTypes.STRING,
    validate: {
      checkGender(inputGender) {
        if (!(inputGender == 'female') || !(inputGender == 'male')) {
          throw new Error('성별 형식이 맞지 않습니다.')
        }
      },
    },
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
  keyword_array: {
    type: DataTypes.STRING,
  },
  img_src_array: {
    type: DataTypes.STRING,
  },

  // Status Attribute
  aiEnable: {
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
