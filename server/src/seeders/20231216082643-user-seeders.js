"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // Hash kata sandi menggunakan bcrypt
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "petugas1",
          password: await bcrypt.hash("password123", 10),
          name: "Marviza Arsaloka",
          role: "admin",
          createdAt: new Date(),
        },
        {
          username: "petugas2",
          password: await bcrypt.hash("password456", 10),
          name: "Ranaysha Alsava",
          role: "operator",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
