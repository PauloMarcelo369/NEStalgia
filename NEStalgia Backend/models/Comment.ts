import { Model, Optional } from "sequelize";
import { DataTypes } from "sequelize";
import User from "./User";
import Game from "./Game";
import db from "../config/db";

interface CommentAttributes {
  userId: number;
  gameId: number;
  comment: string;
}

interface CommentCreationAttributes
  extends Optional<CommentAttributes, "comment"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public userId!: number;
  public gameId!: number;
  public comment!: string;
}

Comment.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: "id",
      },
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Comments",
    tableName: "Comments",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "gameId"],
      },
    ],
  }
);

export default Comment;
