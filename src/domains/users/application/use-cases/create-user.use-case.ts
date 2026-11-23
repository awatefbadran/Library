
import { randomUUID } from 'node:crypto';

import { User } from '../../domain/entities/user.entity.js';
import { Email } from '../../domain/value-objects/email.vo.js';

import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

import { PasswordHasher } from '../../infrastructure/security/password-hasher.js';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  gender: 'male' | 'female' | null;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const email = Email.create(input.email);

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    const user = User.create({
      id: randomUUID(),
      name: input.name,
      email,
      password: hashedPassword,
      role: input.role,
      gender: input.gender,
      createdAt: new Date(),
    });

    return this.userRepository.save(user);
  }
}
