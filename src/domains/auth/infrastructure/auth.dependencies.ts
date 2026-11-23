import { DrizzleUserRepository } from '../../users/infrastructure/persistence/user.repository.impl.js';

import { BcryptPasswordVerifier } from './security/bcrypt-password-verifier.js';

import { JwtService } from './security/jwt.service.js';

import { LoginUseCase } from '../application/use-cases/login.use-case.js';

const userRepository = new DrizzleUserRepository();

const passwordVerifier = new BcryptPasswordVerifier();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

const tokenService = new JwtService(jwtSecret);

export const loginUseCase = new LoginUseCase(
  userRepository,
  passwordVerifier,
  tokenService,
);