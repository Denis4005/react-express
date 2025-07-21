'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Posts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'Post1',
      references: { table: 'Users', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Posts', 'Post1')
  },
}
