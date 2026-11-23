import jwt from 'jsonwebtoken';

import type {
  TokenPayload,
  TokenService,
} from '../../domain/services/token.service.interface.js';

export class JwtService implements TokenService {
  constructor(
    private readonly secret: string,
  ) {}

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: '15m',
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    const decoded = jwt.verify(token, this.secret);

    if (
      typeof decoded === 'string' ||
      typeof decoded.userId !== 'string' ||
      (decoded.role !== 'admin' && decoded.role !== 'member')
    ) {
      throw new Error('Invalid token payload');
    }

    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  }
}