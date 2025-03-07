import { FavoriteService } from "../services/FavoriteService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const insertFavorite = async (req: CustomRequest, res: Response) => {
  const gameId = parseInt(req.params.gameId, 10);
  const userId = parseInt(req.user?.id as string, 10);

  console.log("ESSE DAQUI É MEU USER ID: " + userId);
  try {
    await FavoriteService.addFavorite({ userId, gameId });
    res.status(201).json({ message: "favorito adicionado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFavorites = async (req: CustomRequest, res: Response) => {
  const userid = parseInt(req.user?.id as string, 10);
  try {
    const favoritedGames = await FavoriteService.getAllFavorites(userid);
    res.status(200).json(favoritedGames);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteFavorite = async (req: CustomRequest, res: Response) => {
  const gameId = parseInt(req.params.gameId, 10);
  const userId = parseInt(req.user?.id as string, 10);

  try {
    await FavoriteService.deleteFavorite({ userId, gameId });
    res.status(200).json({ message: "o favorito foi removido!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
