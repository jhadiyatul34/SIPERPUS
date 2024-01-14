'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('peminjaman', {
      id_peminjaman: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      npm: {
        allowNull: false,
        references: {
          model: 'anggota',
          key: 'npm',
        },
        type: Sequelize.STRING
      },     
      tanggalPeminjaman: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggalPengembalian: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.INTEGER
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
    },{
      engine: 'InnoDB',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('peminjaman');
  },
};
