import Game from "../models/Game";
import User from "../models/User";
import Comment from "../models/Comment";
import CommentDto from "../dtos/CommentDto";
import CommentResponseDto from "../dtos/CommentResponseDto";

export class CommentService {
  static insertComment = async (commentDto: CommentDto) => {
    const { userId, gameId, comment } = commentDto;
    try {
      if (!userId || !gameId) {
        throw new Error("você deve informar todos os campos corretamente!");
      }

      const userExists = await User.findOne({ where: { id: userId } });
      const gameExists = await Game.findOne({ where: { id: gameId } });

      if (!userExists) {
        throw new Error("O usuário informado não existe na base de dados!");
      }

      if (!gameExists) {
        throw new Error("O game informado não existe na base de dados");
      }
      await Comment.create({ userId, gameId, comment });
    } catch (error: any) {
      throw new Error("Erro ao tentar inserir o comentário: " + error.message);
    }
  };

  static getGameComments = async (
    gameId: number
  ): Promise<CommentResponseDto[]> => {
    try {
      const comments = await Comment.findAll({
        where: { gameId },
        include: {
          model: User,
          attributes: ["userName"],
          as: "User",
        },
      });

      return comments.map((comment) => ({
        userId: comment.userId,
        userName: (comment as any).user?.username,
        gameId: comment.gameId,
        comment: comment.comment,
        createdAt: comment.createdAt,
      }));
    } catch (error: any) {
      throw new Error("Erro ao resgatar comentários: " + error.message);
    }
  };

  static deleteComment = async (commentUserDto: CommentUserDto) => {
    const { id, userId, role } = commentUserDto;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new Error("Comentário não existe na base de dados");
      }

      if (comment.userId !== id && role !== "admin") {
        throw new Error("O usuário não tem permissão para apagar o comentário");
      }

      await Comment.destroy({ where: { id } });
    } catch (error: any) {
      throw new Error("Erro ao tentar delatar o comentário: " + error.message);
    }
  };
}
