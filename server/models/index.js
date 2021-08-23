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
db.Branding = require('./branding')(sequelize, Sequelize)
db.Style = require('./style')(sequelize, Sequelize)
db.Bid = require('./bid')(sequelize, Sequelize)
db.Room = require('./room')(sequelize, Sequelize)
db.Message = require('./message')(sequelize, Sequelize)
db.Matching = require('./matching')(sequelize, Sequelize)

db.BrandingStyle = require('./relation/brandingStyle')(sequelize, Sequelize)
db.StyleScrap = require('./relation/styleScrap')(sequelize, Sequelize)
db.BidStyle = require('./relation/bidStyle')(sequelize, Sequelize)

// 관계정의 User : Branding = 1 : N
db.User.hasMany(db.Branding, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.Branding.belongsTo(db.User, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 User : Bid = 1 : N
db.User.hasMany(db.Bid, {
  foreignKey: { name: 'customer_id', allowNull: false, as: 'customer' },
  targetKey: { name: 'id', allowNull: false, as: 'customer' },
  onDelete: 'CASCADE',
})
db.Bid.belongsTo(db.User, {
  foreignKey: { name: 'customer_id', allowNull: false, as: 'customer' },
  sourceKey: { name: 'id', allowNull: false, as: 'customer' },
  onDelete: 'CASCADE',
})
db.User.hasMany(db.Bid, {
  foreignKey: { name: 'designer_id', allowNull: false, as: 'designer' },
  targetKey: { name: 'id', allowNull: false, as: 'designer' },
  onDelete: 'CASCADE',
})
db.Bid.belongsTo(db.User, {
  foreignKey: { name: 'designer_id', allowNull: false, as: 'designer' },
  sourceKey: { name: 'id', allowNull: false, as: 'designer' },
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

// 관계정의 User : Message = 1 : N
db.User.hasMany(db.Message, {
  foreignKey: { name: 'sender_id', allowNull: false, as: 'sender' },
  targetKey: { name: 'id', allowNull: false, as: 'sender' },
  onDelete: 'CASCADE',
})
db.Message.belongsTo(db.User, {
  foreignKey: { name: 'sender_id', allowNull: false, as: 'sender' },
  sourceKey: { name: 'id', allowNull: false, as: 'sender' },
  onDelete: 'CASCADE',
})

// 관계정의 User : StyleScrap = M : N
db.Style.belongsToMany(db.User, {
  through: 'styleScrap',
  as: 'styleScraps',
  onDelete: 'CASCADE',
})
db.User.belongsToMany(db.Style, {
  through: 'styleScrap',
  as: 'styleScraps',
  onDelete: 'CASCADE',
})

// 관계정의 Branding : Style = M : N
db.Style.belongsToMany(db.Branding, {
  through: 'brandingStyle',
  as: 'brandingStyles',
  onDelete: 'CASCADE',
})
db.Branding.belongsToMany(db.Style, {
  through: 'brandingStyle',
  as: 'brandingStyles',
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

// 관계정의 Proposal : Bid  = 1 : N
db.Proposal.hasMany(db.Bid, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.Bid.belongsTo(db.Proposal, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 Bid : Room = 1 : 1
db.Bid.hasOne(db.Room, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 Room : Message = 1 : N
db.Room.hasMany(db.Message, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.Message.belongsTo(db.Room, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 Matching : Bid = 1 : 1
db.Matching.belongsTo(db.Bid)
db.Matching.belongsTo(db.Proposal)

module.exports = db
