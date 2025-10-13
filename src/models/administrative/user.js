"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.belongsToMany(models.Contract, {
      //   through: models.UserContract,
      //   foreignKey: "userId",
      //   otherKey: "contractId",
      //   onDelete: "CASCADE",
      //   as: "contracts"
      // })
    }
  }
  User.init(
    {
      companyId: DataTypes.UUID,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
