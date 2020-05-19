'use strict';
module.exports = (sequelize, DataTypes) => {
  const GeoLocation = sequelize.define('GeoLocation', {
    lat: DataTypes.NUMBER,
    lng: DataTypes.NUMBER,
  }, {});
  GeoLocation.associate = function(models) {
    // associations can be defined here
  };
  return GeoLocation;
};