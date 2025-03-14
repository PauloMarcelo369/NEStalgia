import Game from "../models/Game";
import User from "../models/User";
import Favorite from "../models/Favorite";
import { GameDto } from "../dtos/GameDto";
import { FavoriteDto } from "../dtos/FavoriteDto";
import { GameResponseDto } from "../dtos/GameResponseDto";

interface FavoriteWithGame extends Favorite {
  Game: Game;
}

export class FavoriteService {
  static addFavorite = async (favoriteDto: FavoriteDto) => {
    const { userId, gameId } = favoriteDto;
    try {
      if (!userId || !gameId) {
        throw new Error("você deve informar todos os campos corretamente!");
      }

      const userExists = await User.findOne({ where: { id: userId } });
      const gameExists = await Game.findOne({ where: { id: gameId } });

      if (!userExists) {
        throw new Error("O usuário informado não existe na base de dados!");
      }

      if (!gameExists) {
        throw new Error("O game informado não existe na base de dados");
      }

      const favorite = await Favorite.findOne({ where: { userId, gameId } });

      if (favorite) {
        throw new Error("Esse jogo já foi favoritado!");
      }

      await Favorite.create({ userId, gameId });
    } catch (error: any) {
      throw new Error(`erro ao tentar inserir favorito: ${error.message}`);
    }
  };

  static getAllFavorites = async (
    userId: number
  ): Promise<GameResponseDto[]> => {
    try {
      const favorites = await Favorite.findAll({
        where: { userId },
        include: {
          model: Game,
          attributes: [
            "id",
            "filename",
            "title",
            "description",
            "coverImage",
            "bannerImage",
            "releaseDate",
            "genre",
          ],
          as: "Game",
        },
      });

      return (favorites as FavoriteWithGame[]).map(({ Game }) => ({
        id: Game.id,
        filename: Game.filename,
        title: Game.title,
        description: Game.description,
        coverImage: Game.coverImage,
        bannerImage: Game.bannerImage,
        releaseDate: Game.releaseDate,
        genre: Game.genre,
      }));
    } catch (error: any) {
      throw new Error(`Erro ao tentar resgatar favoritos: ${error.message}`);
    }
  };

  static deleteFavorite = async (favoriteDto: FavoriteDto) => {
    const { userId, gameId } = favoriteDto;
    try {
      const favorite = await Favorite.findOne({ where: { userId, gameId } });
      if (!favorite) {
        throw new Error("O favorito informado não existe na base de dados!");
      }
      await Favorite.destroy({ where: { userId, gameId } });
    } catch (error: any) {
      throw new Error(`erro ao tentar deletar favorito: ${error.message}`);
    }
  };
}
