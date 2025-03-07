const associations = () => {
  const { default: Game } = require("./Game");
  const { default: User } = require("./User");
  const { default: Favorite } = require("./Favorite");
  Game.hasMany(Favorite, {
    foreignKey: "gameId",
    onDelete: "CASCADE",
    as: "favorites", // A associação será referida como "favorites"
  });

  Favorite.belongsTo(Game, {
    foreignKey: "gameId",
    as: "Game", // "Game" será acessado diretamente no Favorite
  });

  // A associação entre User e Favorite
  User.hasMany(Favorite, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "favorites", // A associação será referida como "favorites"
  });

  Favorite.belongsTo(User, {
    foreignKey: "userId",
    as: "User", // "User" será acessado diretamente no Favorite
  });
};

export default associations;
