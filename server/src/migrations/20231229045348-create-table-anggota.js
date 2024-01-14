'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('books', { id: Sequelize.INTEGER });
     */
       await queryInterface.createTable('anggota', {
        npm: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
        },
        nama: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tanggal_lahir: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        tempat_lahir: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        jenis_kelamin: {
          type: Sequelize.ENUM("Laki-Laki", "Perempuan"),
          allowNull: false,
        },
        prodi: {
          type: Sequelize.STRING,
          allowNull: false
        },
        fakultas: {
          type: Sequelize.STRING,
          allowNull: false
        },
        alamat: {
          type: Sequelize.STRING,
          allowNull: false
        },
        no_hp: {
          type: Sequelize.STRING,
          allowNull: false
        },
        masa_berlaku: {
          type: Sequelize.DATE,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
          allowNull: true,
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
        }
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
