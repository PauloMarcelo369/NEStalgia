import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "erro: token inválido!" });
    return;
  }

  const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(
    bearerToken,
    process.env.JWT_SECRET as string,
    (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: "erro: você não tem permissão para acessar essa rota!",
        });
      } else {
        const decodedToken = decoded as JwtPayload;
        req.user = {
          id: decodedToken.id,
          role: decodedToken.role,
        };
        next();
      }
    }
  );
};

export default authentication;
