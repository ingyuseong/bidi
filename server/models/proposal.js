const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'proposal'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  before_src: {
    type: DataTypes.STRING,
  },
  after_src: {
    type: DataTypes.STRING,
  },
  priceLimit: {
    type: DataTypes.INTEGER,
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
  matching: {
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
  // 외래키 설정
  //   model.associate = (db) => {
  //     model.belongsTo(db.user, { foreignKey: 'uid', targetKey: 'uid' })
  //     model.belongsTo(db.payment, { foreignKey: 'pid', targetKey: 'pid' })
  //   }
  return model
}
