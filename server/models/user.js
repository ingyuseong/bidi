const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'user'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_type: {
    type: DataTypes.STRING,
    validate: {
      checkUserType(inputUserType) {
        if (!(inputUserType == 'customer') || !(inputUserType == 'designer')) {
          throw new Error('유저 형식이 맞지 않습니다.')
        }
      },
    },
  },
  naver_token: {
    type: DataTypes.STRING,
  },
  kakao_token: {
    type: DataTypes.STRING,
  },
  apple_token: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  nickName: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  birth: {
    type: DataTypes.STRING,
  },
  gender_type: {
    type: DataTypes.STRING,
    validate: {
      checkGender(inputGender) {
        if (inputGender != 'female' && inputGender != 'male') {
          throw new Error('유저 성별 형식이 맞지 않습니다.')
        }
      },
    },
  },
  img_src: {
    type: DataTypes.STRING,
  },

  // Status Attributes
  authentication: {
    type: DataTypes.BOOLEAN,
  },
  aiStatus: {
    type: DataTypes.BOOLEAN,
  },
  aiProcess: {
    type: DataTypes.BOOLEAN,
  },
  aiCount: {
    type: DataTypes.INTEGER,
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
  // 외래키 설정
  return model
}
