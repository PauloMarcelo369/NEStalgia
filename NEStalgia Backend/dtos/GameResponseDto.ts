export interface GameResponseDto {
  id: number;
  filename: string;
  title: string;
  description?: string;
  coverImage?: string;
  bannerImage?: string;
  releaseDate?: Date;
  genre?: string;
}
