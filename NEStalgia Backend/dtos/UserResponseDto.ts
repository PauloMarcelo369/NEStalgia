export interface UserResponseDto {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
}
