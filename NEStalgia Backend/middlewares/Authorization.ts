import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || req.user.id !== "admin") {
    res.status(403).json({
      message:
        "Acesso negado: somente administradores podem realizar esta ação!",
    });
    return;
  }
  next();
};
