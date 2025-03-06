import express, { Request, Response } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import path from "path";
import fs from "fs";
import authentication from "../middlewares/Authentication";
import { isAdmin } from "../middlewares/Authorization";
import { downloadRom, insertDataGame } from "../controllers/GameController";

const romsRouter = express.Router();

romsRouter.post(
  "/upload",
  authentication,
  isAdmin,
  multer(multerConfig).single("file"),
  insertDataGame
);

romsRouter.get("/download/:filename", downloadRom);

export default romsRouter;
