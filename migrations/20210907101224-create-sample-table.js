'use strict';
const moment = require('moment');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Samples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.ENUM,
        values: ['Surat Masuk', 'Surat Keluar', 'Surat Tersimpan'],
        defaultValue: 'Surat Masuk',
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      deletedAt:{
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Samples');
  }
};
