
import type { User } from '../../domain/entities/user.entity.js';
import { validate as isUUID } from 'uuid';
import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
async execute(id: string): Promise<User> {
  if (!isUUID(id)) {
    throw new Error('Invalid user ID');
  }

  const user = await this.userRepository.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
}
