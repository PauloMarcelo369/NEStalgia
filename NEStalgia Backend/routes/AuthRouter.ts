import { userRegister, userLogin } from "../controllers/AuthController";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

export default authRouter;
