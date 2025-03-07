import express from "express";
import {
  deleteFavorite,
  getAllFavorites,
  insertFavorite,
} from "../controllers/FavoriteController";
import authentication from "../middlewares/Authentication";

const favoriteRouter = express.Router();

favoriteRouter.post("/insert/{gameId}", authentication, insertFavorite);
favoriteRouter.get("/myfavorites", authentication, getAllFavorites);
favoriteRouter.delete("/delete", authentication, deleteFavorite);

export default favoriteRouter;
