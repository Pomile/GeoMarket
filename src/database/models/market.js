'use strict';
module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
    street: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Market.associate = function (models) {
    // associations can be defined here
    Market.belongsTo(models.GeoLocation, {
      foreignKey: 'geoLocationId',
      as: 'geoLocation',
      target: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Market.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      target: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Market.hasMany(models.MarketImage, {
      foreignKey: 'id',
      as: 'images',
      source: 'id',
      target: 'marketId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

  };
  return Market;
};