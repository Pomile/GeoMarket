'use strict';
import data from './data/geoLocation';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('GeoLocations',data, {});
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('GeoLocations', null, {});
  }
};
