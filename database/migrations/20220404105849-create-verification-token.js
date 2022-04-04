'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_tokens', {
      token: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      identifier: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verification_tokens');
  }
};