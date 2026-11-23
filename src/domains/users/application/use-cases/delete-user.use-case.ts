import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

import { validate as isUUID } from 'uuid';

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new Error('Invalid user ID');
    }

    const deleted = await this.userRepository.delete(id);

    if (!deleted) {
      throw new Error('User not found');
    }
  }
}