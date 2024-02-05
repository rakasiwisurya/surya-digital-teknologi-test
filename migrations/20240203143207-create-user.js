"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: "Hey, {first_name} {last_name} it’s your birthday",
      },
      status_message: {
        allowNull: false,
        type: Sequelize.STRING(20),
        defaultValue: "UNSENT",
      },
      sent_time: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
