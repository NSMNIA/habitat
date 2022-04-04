'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class verification_token extends Model {
    static associate(models) {
      // define association here
    }
  }
  verification_token.init({
    token: DataTypes.STRING,
    identifier: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'verification_token',
  });
  return verification_token;
};