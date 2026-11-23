import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import { JwtService } from '../../domains/auth/infrastructure/security/jwt.service.js';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

const tokenService = new JwtService(jwtSecret);

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: 'admin' | 'member';
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      res.status(401).json({
        message: 'Authentication token is required',
      });
      return;
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({
        message: 'Invalid authentication token',
      });
      return;
    }

    const payload = tokenService.verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch {
    res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};