const associations = () => {
  const { default: Game } = require("./Game");
  const { default: User } = require("./User");
  const { default: Favorite } = require("./Favorite");
  const { default: Comment } = require("./Comment");
  Game.hasMany(Favorite, {
    foreignKey: "gameId",
    onDelete: "CASCADE",
    as: "favorites",
  });

  Favorite.belongsTo(Game, {
    foreignKey: "gameId",
    as: "Game",
  });

  User.hasMany(Favorite, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "favorites",
  });

  Favorite.belongsTo(User, {
    foreignKey: "userId",
    as: "User",
  });

  Game.hasMany(Comment, {
    foreignKey: "gameId",
    onDelete: "CASCADE",
    as: "comments",
  });

  Comment.belongsTo(Game, {
    foreignKey: "gameId",
    as: "Game",
  });

  User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "comments",
  });

  Comment.belongsTo(User, {
    foreignKey: "userId",
    as: "User",
  });
};

export default associations;
