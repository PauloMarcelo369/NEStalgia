import { Error } from "sequelize";
import { UserAuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { LoginDto } from "../dtos/LoginDto";
import { UserDto } from "../dtos/UserDto";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userDto: UserDto = req.body;
    await UserAuthService.userRegister(userDto);
    res.status(201).json({ message: "O usuário foi registrado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const loginDto: LoginDto = req.body;
    const token = await UserAuthService.userLogin(loginDto);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
