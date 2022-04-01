'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          username: '081326795661',
          fullname: 'Admin',
          password: '$2b$04$UR/xB21XHpDGWFkMfNgA7u8U.C8p7N8Gq6sa3KDk1y7lop1wwvLTq',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, { truncate: true });
  }
};
