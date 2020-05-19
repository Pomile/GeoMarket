'use strict';
import data from './data/market';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Markets', data, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Markets', null, {});
  }
};
