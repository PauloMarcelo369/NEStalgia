import { Sequelize } from "sequelize";
import path from "node:path";

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../storage/database.sqlite"),
});

export default db;
