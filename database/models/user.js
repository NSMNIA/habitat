import { Model, DataTypes } from 'sequelize';
import connection from '../connection'
const initUser = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Roles);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      emailVerified: DataTypes.DATE,
      image: DataTypes.STRING,
      roles: DataTypes.NUMBER
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  );
  return User;
};

export default initUser(connection, DataTypes)