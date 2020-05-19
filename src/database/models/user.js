'use strict';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin','user')
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

export default userModel;
