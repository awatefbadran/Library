
import type { User } from '../../domain/entities/user.entity.js';

import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

export class GetAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
