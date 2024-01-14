// models/pengembalian.js
const { DataTypes } = require('sequelize');
const Peminjaman = require('./peminjaman');
const Anggota = require('./anggota');
const User = require('./users');

module.exports = (sequelize) => {
  const Pengembalian = sequelize.define(
    'Pengembalian',
    {
      id_pengembalian: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      tanggalPengembalian: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      denda: {
        type: DataTypes.DOUBLE, 
        allowNull: false,
      },
      id_peminjaman: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Peminjaman,
          key: 'id_peminjaman',
        },
      },
      npm: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Anggota,
          key: 'npm',
        },
      },
      id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
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
      tableName: 'pengembalian', // Sesuaikan dengan nama tabel yang sesuai
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
  Pengembalian.associate = function (models) {
    Pengembalian.belongsTo(models.Peminjaman, {
      foreignKey: 'id_peminjaman',
      as: 'Peminjaman',
    });
    Pengembalian.belongsTo(models.Anggota, {
      foreignKey: 'npm',
      as: 'Anggota',
    });
    Pengembalian.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'Petugas',
    });
  };
  return Pengembalian;
};
