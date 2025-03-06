import Game from "../models/Game";
import { GameDto } from "../dtos/GameDto";

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
}
