'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
    }
  }
  Account.init({
    type: DataTypes.STRING,
    provider: DataTypes.STRING,
    provider_account_id: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    access_token: DataTypes.STRING,
    expires_at: DataTypes.NUMBER,
    token_type: DataTypes.STRING,
    scope: DataTypes.STRING,
    id_token: DataTypes.STRING,
    session_state: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};