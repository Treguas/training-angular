export interface IAuthSuccessResponse {
  message: string;
  user: {
    userId: string;
    email: string;
    name: string;
    iat: number;
    exp: number;
  }
}