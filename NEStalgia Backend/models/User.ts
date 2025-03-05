import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: "user" | "admin";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);

export default User;
