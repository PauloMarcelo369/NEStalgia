import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";
import User from "./User";
import Game from "./Game";

interface UserGameAttributes {
  userId: number;
  gameId: number;
}

interface UserGameCreationAttributes
  extends Optional<UserGameAttributes, "userId" | "gameId"> {}

class Favorite
  extends Model<UserGameAttributes, UserGameCreationAttributes>
  implements UserGameAttributes
{
  public userId!: number;
  public gameId!: number;
}

Favorite.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    modelName: "Favorite",
    tableName: "Favorites",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "gameId"],
      },
    ],
  }
);

export default Favorite;
