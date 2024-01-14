'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pengembalian', {
      id_pengembalian: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tanggalPengembalian: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      denda: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      id_peminjaman: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'peminjaman',
            key: 'id_peminjaman',
          },
      }, 
      npm: {
        allowNull: false,
        references: {
          model: 'anggota',
          key: 'npm',
        },
        type: Sequelize.STRING
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
