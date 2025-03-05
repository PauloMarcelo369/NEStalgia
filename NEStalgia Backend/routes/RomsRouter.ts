import express, { Request, Response } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import path from "path";
import fs from "fs";
import authentication from "../middlewares/Authentication";
import { isAdmin } from "../middlewares/Authorization";

const romsRouter = express.Router();

romsRouter.post(
  "/upload",
  authentication,
  isAdmin,
  multer(multerConfig).single("file"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }
    res.json({
      message: "Arquivo enviado com sucesso!",
      file: req.file,
    });
  }
);

romsRouter.get("/download/:filename", async (req, res) => {
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
});

export default romsRouter;
