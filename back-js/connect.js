const { Sequelize } = require('sequelize')

const UsersModel = require('./models/Users')
const PostsModel = require('./models/Posts')

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:777@db:5432/dbproj',
)

const Users = UsersModel(sequelize)
const Posts = PostsModel(sequelize)

const db = {
  sequelize,
  Users,
  Posts,
}

module.exports = db
