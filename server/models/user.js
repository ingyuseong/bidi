const { DataTypes } = require('sequelize')

const modelName = 'user'

const modelAttributes = {
  tid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  money: {
    type: DataTypes.INTEGER,
  },
  time: {
    type: DataTypes.BIGINT,
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
