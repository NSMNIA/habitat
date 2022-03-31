/* eslint-disable no-unused-vars */
import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initUsers = (sequelize, Types) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      firstname: Types.STRING,
      lastname: Types.STRING,
      email: Types.STRING,
      password: Types.STRING,
      email_verified_at: Types.DATE,
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Users;
};

export default initUsers(connection, DataTypes);
