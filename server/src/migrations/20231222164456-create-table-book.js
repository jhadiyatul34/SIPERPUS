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
    await queryInterface.createTable('Books', {
      isbn: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      penulis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      penerbit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tahun: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_rak: {
        type: Sequelize.STRING,
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
