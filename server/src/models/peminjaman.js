// Peminjaman.js
'use strict';
const { DataTypes } = require('sequelize');
const User = require('./users');
const Anggota = require('./anggota');

module.exports = (sequelize) => {
  const Peminjaman = sequelize.define(
    'Peminjaman',
    {
      id_peminjaman: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      npm: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: Anggota,
          key: 'npm',
        },
      },
      tanggalPeminjaman: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tanggalPengembalian: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM("Sudah Dikembalikan", "Belum Dikembalikan"),
        defaultValue: "Belum Dikembalikan",
        allowNull: false,
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
      tableName: 'peminjaman',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  Peminjaman.associate = function (models) {
    Peminjaman.belongsTo(models.User, { foreignKey: 'id', as: 'Petugas' });
    Peminjaman.hasMany(models.DetailPeminjaman, { foreignKey: 'id_peminjaman', as: 'Detail' });
    Peminjaman.belongsTo(models.Anggota, { foreignKey: 'npm', as: 'Anggota' });
  };
  
  return Peminjaman;
};
