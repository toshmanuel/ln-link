'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id",
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  }
};
