import { PasswordHasher } from '../../../users/infrastructure/security/password-hasher.js';

import type {
  PasswordVerifier,
} from '../../domain/services/password-verifier.interface.js';

export class BcryptPasswordVerifier implements PasswordVerifier {
  private readonly passwordHasher = new PasswordHasher();

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.passwordHasher.compare(
      plainPassword,
      hashedPassword,
    );
  }
}