import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRouter from "./routes/AuthRouter";
import User from "./models/User";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", authRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");
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
