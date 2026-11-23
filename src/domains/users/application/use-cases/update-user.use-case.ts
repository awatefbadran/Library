import type { User } from '../../domain/entities/user.entity.js';

import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

import { Email } from '../../domain/value-objects/email.vo.js';

interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  gender?: 'male' | 'female' | null;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error('User not found');
    }
if (input.email) {
  const email = Email.create(input.email);

  const existingUser = await this.userRepository.findByEmail(email);

  if (existingUser && existingUser.id !== user.id) {
    throw new Error('Email is already registered');
  }
}
    const updatedUser = user.update({
      name: input.name,
      email: input.email
        ? Email.create(input.email)
        : undefined,
      gender: input.gender,
    });

    return this.userRepository.update(updatedUser);
  }
}
