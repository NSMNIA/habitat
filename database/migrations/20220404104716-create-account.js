'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING
      },
      provider_account_id: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.INTEGER
      },
      token_type: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
      },
      id_token: {
        type: Sequelize.INTEGER
      },
      session_state: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};