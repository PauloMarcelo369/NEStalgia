import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRouter from "./routes/AuthRouter";
import User from "./models/User";
import Game from "./models/Game";

import Favorite from "./models/Favorite";
import associations from "./models/Associations";
import romsRouter from "./routes/RomsRouter";
import favoriteRouter from "./routes/FavoriteRouter";

dotenv.config();
const app = express();
app.use(cors());
associations();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/roms", romsRouter);
app.use("/favorites", favoriteRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");
    // await Favorite.drop();
    // await Game.destroy({
    //   where: {},
    // });
    console.log("Todos os jogos foram deletados.");
    await sequelize.sync();
    console.log("Modelos sincronizados com sucesso.");
  } catch (error: any) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
};

start();

app.listen(3000, (error: any) => {
  console.log(`servidor ouvindo na porta: ${3000}`);
});
