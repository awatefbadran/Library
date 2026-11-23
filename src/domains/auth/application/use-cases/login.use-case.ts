import type { UserRepository } from '../../../users/domain/repositories/user.repository.interface.js';

import type { PasswordVerifier } from '../../domain/services/password-verifier.interface.js';

import type { TokenService } from '../../domain/services/token.service.interface.js';

import { Email } from '../../../users/domain/value-objects/email.vo.js';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordVerifier: PasswordVerifier,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: {
    email: string;
    password: string;
  }) {
    const email = Email.create(input.email);

    const user = await this.userRepository.findByEmail(email);
    console.log('Found user:', user?.email.value);
console.log('Found user ID:', user?.id);
console.log('Found user role:', user?.role);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.passwordVerifier.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email.value,
        role: user.role,
      },
    };
  }
}