import type { Response, NextFunction } from 'express';

import type {
  AuthenticatedRequest,
} from './authenticate.js';

import type {
  UserRole,
} from '../../domains/users/domain/entities/user.entity.js';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({
        message: 'Authentication required',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
      return;
    }

    next();
  };
};