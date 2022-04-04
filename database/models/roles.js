'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      this.hasOne(models.User)
    }
  }
  Roles.init({
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
