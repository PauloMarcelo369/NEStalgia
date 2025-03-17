interface CommentResponseDto {
  userId: number;
  userName: string;
  gameId: number;
  comment?: string;
  createdAt: Date;
}

export default CommentResponseDto;
