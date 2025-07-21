const { Sequelize } = require('sequelize')

module.exports = sequelize => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          max: 100,
          min: 5,
        },
        defaultValue: Sequelize.fn('random'),
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 8,
        },
        defaultValue: 'empty',
        type: Sequelize.STRING,
      },
      roles: {
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: '0',
        type: Sequelize.STRING,
      },
    },
    { tableName: 'Users', timestamps: false },
  )
  Users.addHook('beforeCreate', user => {
    user.roles = '0'
  })
  return Users
}
