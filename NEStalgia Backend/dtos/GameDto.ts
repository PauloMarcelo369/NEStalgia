export interface GameDto {
  filename: string;
  title: string;
  description?: string;
  coverImage?: string;
  bannerImage?: string;
  releaseDate?: Date;
  genre?: string;
}
