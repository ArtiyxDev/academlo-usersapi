import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

/**
 * User attributes interface
 */
export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User creation attributes interface (id is optional for creation)
 */
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

/**
 * User model class
 */
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public birthday!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Initialize User model with schema definition
 */
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
