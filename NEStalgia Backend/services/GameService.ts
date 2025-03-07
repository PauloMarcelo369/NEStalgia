import Game from "../models/Game";
import { GameDto } from "../dtos/GameDto";
import { GameResponseDto } from "../dtos/GameResponseDto";

export class GameService {
  static insertDataGame = async (gameDto: GameDto) => {
    const { title, filename } = gameDto;

    if (!filename) {
      throw new Error("É necessário informar um filename válido");
    }
    if (!title) {
      throw new Error("Informe um titulo para o game!");
    }

    const gameExists = await Game.findOne({ where: { title } });

    if (gameExists) {
      throw new Error("Você não pode adicionar esse game: jogo já existe!");
    }

    await Game.create(gameDto);
  };

  static getGames = async (): Promise<GameResponseDto[]> => {
    try {
      const games = await Game.findAll();
      return games.map((game) => ({
        id: game.id,
        filename: game.filename,
        title: game.title,
        description: game.description,
        coverImage: game.coverImage,
        bannerImage: game.bannerImage,
        releaseDate: game.releaseDate,
        genre: game.genre,
      }));
    } catch (error: any) {
      throw new Error("Erro ao resgatar os games: " + error.message);
    }
  };
}
