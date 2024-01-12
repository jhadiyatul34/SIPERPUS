// const { DataTypes } = require('DataTypes');
// const DataTypes = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      isbn: {
        allowNull: false,
        primaryKey: true,
        unique: true, // Menandakan bahwa nilai harus unik
        type: DataTypes.STRING,
        validate: {
          notEmpty: true, // contoh aturan validasi
        },
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penulis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penerbit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tahun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kategori: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_rak: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'books',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
  return Book;
};