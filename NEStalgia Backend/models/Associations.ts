import Game from "./Game";
import Favorite from "./Favorite";
import User from "./User";

const associations = () => {
  Game.belongsToMany(User, {
    through: Favorite,
    foreignKey: "gameId",
    constraints: true,
    onDelete: "CASCADE",
  });

  User.belongsToMany(Game, {
    through: Favorite,
    foreignKey: "userId",
    constraints: true,
    onDelete: "CASCADE",
  });
};

export default associations;
