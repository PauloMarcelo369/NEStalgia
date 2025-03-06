import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";
import User from "./User";
import Favorite from "./Favorite";

interface GameAttributes {
  id: number;
  filename: string;
  title: string;
  description?: string;
  coverImage?: string;
  bannerImage?: string;
  releaseDate?: Date;
  genre?: string;
}

interface GameCreationAttributes extends Optional<GameAttributes, "id"> {}

class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: number;
  public filename!: string;
  public title!: string;
  public description?: string;
  public coverImage?: string;
  public bannerImage?: string;
  public releaseDate?: Date;
  public genre?: string;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Game",
  }
);

Game.belongsToMany(User, {
  through: Favorite,
  foreignKey: "gameId",
  as: "favoritedByUsers",
});

export default Game;
