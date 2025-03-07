import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import authentication from "../middlewares/Authentication";
import { isAdmin } from "../middlewares/Authorization";
import {
  downloadRom,
  getAllGames,
  insertDataGame,
} from "../controllers/GameController";

const romsRouter = express.Router();

romsRouter.post(
  "/upload",
  authentication,
  isAdmin,
  multer(multerConfig).single("file"),
  insertDataGame
);

romsRouter.get("/download/:filename", downloadRom);

romsRouter.get("/allGames", getAllGames);

export default romsRouter;
