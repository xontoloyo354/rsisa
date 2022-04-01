'use strict';
const fs = require('fs')
const path = require('path')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const filePath = path.join(__dirname, 'samples-seeder.sql')
    const result = fs.readFileSync(filePath, { encoding: 'utf-8' })
    return queryInterface.sequelize.query(result);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Samples', null, { truncate: true });
  }
};
