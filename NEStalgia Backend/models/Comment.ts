import { Model, Optional, DataTypes } from "sequelize";
import User from "./User";
import Game from "./Game";
import db from "../config/db";

interface CommentAttributes {
  id: number;
  userId: number;
  gameId: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id" | "createdAt" | "updatedAt"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public userId!: number;
  public gameId!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "Comment",
    tableName: "Comments",
    timestamps: true,
  }
);

export default Comment;
