'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// 모델정의
db.User = require('./user')(sequelize, Sequelize)
db.Proposal = require('./proposal')(sequelize, Sequelize)
db.BrandingPage = require('./brandingPage')(sequelize, Sequelize)
db.Style = require('./style')(sequelize, Sequelize)
db.Bid = require('./bid')(sequelize, Sequelize)

db.StyleMenu = require('./relation/styleMenu')(sequelize, Sequelize)
db.BidStyle = require('./relation/bidStyle')(sequelize, Sequelize)

// 관계정의 User : BrandingPage = 1 : N
db.User.hasMany(db.BrandingPage, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.BrandingPage.belongsTo(db.User, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 User : Bid = 1 : N
db.User.hasMany(db.Bid, {
  foreignKey: { name: 'customer_id', allowNull: false },
  targetKey: { name: 'id', allowNull: false },
  onDelete: 'CASCADE',
})
db.Bid.belongsTo(db.User, {
  foreignKey: { name: 'customer_id', allowNull: false },
  sourceKey: { name: 'id', allowNull: false },
  onDelete: 'CASCADE',
})
db.User.hasMany(db.Bid, {
  foreignKey: { name: 'customer_id', allowNull: false },
  targetKey: { name: 'id', allowNull: false },
  onDelete: 'CASCADE',
})
db.Bid.belongsTo(db.User, {
  foreignKey: { name: 'customer_id', allowNull: false },
  sourceKey: { name: 'id', allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 User : Proposal = 1 : N
db.User.hasMany(db.Proposal, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.Proposal.belongsTo(db.User, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 BrandingPage : Style = M : N
db.Style.belongsToMany(db.BrandingPage, {
  through: 'styleMenu',
  as: 'styleMenus',
  onDelete: 'CASCADE',
})
db.BrandingPage.belongsToMany(db.Style, {
  through: 'styleMenu',
  as: 'styleMenus',
  onDelete: 'CASCADE',
})

// 관계정의 Bid : Style = M : N
db.Style.belongsToMany(db.Bid, {
  through: 'bidStyle',
  as: 'bidStyles',
  onDelete: 'CASCADE',
})
db.Bid.belongsToMany(db.Style, {
  through: 'bidStyle',
  as: 'bidStyles',
  onDelete: 'CASCADE',
})

// 관계정의 Bid : Proposal = 1 : 1
db.Proposal.hasOne(db.Bid, {
  foreignKey: { name: 'proposal_id', allowNull: false },
})

module.exports = db
