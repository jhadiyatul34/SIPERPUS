// models/anggota.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Anggota = sequelize.define(
    "Anggota",
    {
      npm: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      images: {
        type: DataTypes.BLOB("long"),
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
        allowNull: false,
      },
      prodi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fakultas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      masa_berlaku: {
        type: DataTypes.DATE,
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
      tableName: "anggota", // Sesuaikan dengan nama tabel yang sesuai
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  Anggota.associate = function (models) {
    Anggota.hasMany(models.Peminjaman, { foreignKey: "npm" });
  };

  return Anggota;
};
