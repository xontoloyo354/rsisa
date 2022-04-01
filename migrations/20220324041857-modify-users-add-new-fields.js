'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'department',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            after: 'fullname',
          },
          { transaction: t },
        ),
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([queryInterface.removeColumn('Users', 'department', { transaction: t })])
    })
  },
}
