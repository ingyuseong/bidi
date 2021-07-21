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
db.Keyword = require('./keyword')(sequelize, Sequelize)
db.BrandingPage = require('./brandingPage')(sequelize, Sequelize)
db.Style = require('./style')(sequelize, Sequelize)

db.ProposalKeyword = require('./relation/proposalKeyword')(sequelize, Sequelize)
db.StyleMenu = require('./relation/styleMenu')(sequelize, Sequelize)
db.BrandingPageKeyword = require('./relation/brandingPageKeyword')(
  sequelize,
  Sequelize
)

// 관계정의 User : BrandingPage = 1 : N
db.User.hasMany(db.BrandingPage, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})
db.BrandingPage.belongsTo(db.User, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
})

// 관계정의 BrandingPage : Keyword = N : N
db.Keyword.belongsToMany(db.BrandingPage, {
  through: 'brandingPageKeyword',
  as: 'brandingPageKeywords',
  onDelete: 'cascade',
})
db.BrandingPage.belongsToMany(db.Keyword, {
  through: 'brandingPageKeyword',
  as: 'brandingPageKeywords',
  onDelete: 'cascade',
})

// 관계정의 BrandingPage : Style = N : N
db.Keyword.belongsToMany(db.BrandingPage, {
  through: 'styleMenu',
  as: 'styleMenus',
  onDelete: 'cascade',
})
db.BrandingPage.belongsToMany(db.Style, {
  through: 'styleMenu',
  as: 'styleMenus',
  onDelete: 'cascade',
})

module.exports = db
