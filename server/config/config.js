require('dotenv').config()

module.exports = {
  projectName: process.env.PROJECT_NAME,
  isProduction: process.env.NODE_ENV === 'production',
  slackToken: process.env.SLACK_TOKEN,
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
  },
}
