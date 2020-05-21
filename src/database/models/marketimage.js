'use strict';
module.exports = (sequelize, DataTypes) => {
  const MarketImage = sequelize.define('MarketImage', {
    url: DataTypes.STRING,
    marketId: DataTypes.STRING
  }, {});
  MarketImage.associate = function(models) {
    // associations can be defined here
    MarketImage.belongsTo(models.Market, {
      foreignKey: 'marketId',
      as: 'market',
      target: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return MarketImage;
};