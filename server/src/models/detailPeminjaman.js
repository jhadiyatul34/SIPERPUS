const { DataTypes } = require('sequelize');
const Peminjaman = require('./peminjaman');
const Book = require('./books');

module.exports = (sequelize) => {
  const DetailPeminjaman = sequelize.define(
    'DetailPeminjaman',
    {
      id_peminjaman: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Peminjaman,
          key: 'id_peminjaman',
        },
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Book,
          key: 'isbn',
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
      tableName: 'detail_peminjaman',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  DetailPeminjaman.associate = function (models) {
    DetailPeminjaman.belongsTo(models.Peminjaman, {
      foreignKey: 'id_peminjaman',
      as: 'Peminjaman',
    });
    DetailPeminjaman.belongsTo(models.Book, { foreignKey: 'isbn', as: 'Buku' });
  };

  return DetailPeminjaman;
};
