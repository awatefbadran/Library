export interface TokenPayload {
  userId: string;
  role: 'admin' | 'member';
}

export interface TokenService {
  generateAccessToken(payload: TokenPayload): string;

  verifyAccessToken(token: string): TokenPayload;
}