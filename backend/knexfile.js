require('dotenv').config()

const path = require('path')

module.exports = {
  client: "mysql",
  connection: {
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname,'./src/config/migrations')
  },
  seeds: {
    directory: path.resolve(__dirname,'./src/config/seeds')
  },
}