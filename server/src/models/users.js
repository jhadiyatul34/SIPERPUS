// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("operator", "admin"),
        defaultValue: "operator",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return User;
};
