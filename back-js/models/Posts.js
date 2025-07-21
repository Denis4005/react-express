const { Sequelize } = require('sequelize')
const Users = require('./Users')

module.exports = sequelize => {
  const Posts = sequelize.define(
    'Posts',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: Users,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    { tableName: 'Posts', timestamps: false },
  )

  return Posts
}
