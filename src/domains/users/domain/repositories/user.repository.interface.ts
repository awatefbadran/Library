
import type { User } from '../entities/user.entity.js';
import type { Email } from '../value-objects/email.vo.js';

export interface UserRepository {
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(): Promise<User[]>;
}