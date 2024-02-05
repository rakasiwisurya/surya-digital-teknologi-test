"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
      location: DataTypes.STRING,
      message: DataTypes.TEXT,
      status_message: DataTypes.STRING,
      sent_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
