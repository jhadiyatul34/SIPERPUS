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
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          isbn:"851901",
          judul:"Web Service",
          penulis:"Benjamin Ian",
          penerbit:"Gramedia",
          tahun:"2019",
          kategori:"Programming",
          no_rak: "P01",
          createdAt: new Date(),
        },
        {
          isbn:"635293",
          judul:"MeloDylan",
          penulis:"Asriaci",
          penerbit:"Coconut Books",
          tahun:"2017",
          kategori:"Novel",
          no_rak: "Q01",
          createdAt: new Date(),
        },
      ],
      {}
    );
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
