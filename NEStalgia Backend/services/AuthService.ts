import jwt from "jsonwebtoken";
import User from "../models/User";
import { UserDto } from "../dtos/UserDto";
import { UserResponseDto } from "../dtos/UserResponseDto";
import bcrypt from "bcryptjs";
import { where } from "sequelize";
import { LoginDto } from "../dtos/LoginDto";

export class UserAuthService {
  static userRegister = async (user: UserDto): Promise<void> => {
    const { username, email, password } = user;

    if (!username || !email || !password) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    const userExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new Error("O nome de usuário já está em uso.");
    }
    if (emailExists) {
      throw new Error("O email já está cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });
  };

  static userLogin = async (credentials: LoginDto): Promise<string> => {
    const { email, password } = credentials;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Não existe usuário associado a esse email!");
    }

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordIsValid) {
      throw new Error("Senha inválida!");
    }

    const payload: UserResponseDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return token;
  };
}
