'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('peminjaman', [
      {
        id_peminjaman: 'PM324001',
        npm: '5210311013', // NPM yang sesuai dengan data dari seeder anggota
        tanggalPeminjaman: '2024-01-02',
        tanggalPengembalian: '2024-01-09',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_peminjaman: 'PM324002',
        npm: '5210311011', // NPM yang sesuai dengan data dari seeder anggota
        tanggalPeminjaman: '2024-01-03',
        tanggalPengembalian: '2024-01-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_peminjaman: 'PM324003',
        npm: '5210311020', // NPM yang sesuai dengan data dari seeder anggota
        tanggalPeminjaman: '2024-01-02',
        tanggalPengembalian: '2024-01-09',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
