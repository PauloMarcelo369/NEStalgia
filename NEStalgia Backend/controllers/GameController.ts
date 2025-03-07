import { GameService } from "../services/GameService";
import { Request, Response } from "express";
import { GameDto } from "../dtos/GameDto";
import fs from "fs";
import path from "path";

export const insertDataGame = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }

    const { title, description, releaseDate, genre, coverImage, bannerImage } =
      req.body;

    const gameDto: GameDto = {
      filename: req.file.filename,
      title,
      description,
      releaseDate,
      coverImage,
      bannerImage,
      genre,
    };
    await GameService.insertDataGame(gameDto);
    res.status(201).json({ message: "game inserido com sucesso!" });
  } catch (error: any) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res
      .status(500)
      .json({ message: "Erro ao cadastrar a ROM", error: error.message });
  }
};

export const downloadRom = async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "roms", filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "Arquivo não encontrado" });
    return;
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao enviar o arquivo" });
      return;
    }
  });
};

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await GameService.getGames();
    res.status(200).json(games);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
