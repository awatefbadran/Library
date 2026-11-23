
import { eq } from 'drizzle-orm';

import { db } from '../../../../config/db.js';
import { users } from './user.model.js';

import {
  findAll as findAllRecords,
  findById as findRecordById,
} from '../../../../shared/database/database.helpers.js';

import { User } from '../../domain/entities/user.entity.js';
import { Email } from '../../domain/value-objects/email.vo.js';

import type {
  UserRepository,
} from '../../domain/repositories/user.repository.interface.js';

export class DrizzleUserRepository implements UserRepository {
async save(user: User): Promise<User> {
  const [savedUser] = await db
    .insert(users)
    .values({
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password,
      role: user.role,
      gender: user.gender,
    })
    .returning();

  if (!savedUser) {
    throw new Error('Failed to save user');
  }

  return this.toDomain(savedUser);
}
// Update User
async update(user: User): Promise<User> {
  const [updatedUser] = await db
    .update(users)
    .set({
      name: user.name,
      email: user.email.value,
      gender: user.gender,
    })
    .where(eq(users.id, user.id))
    .returning();

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return this.toDomain(updatedUser);
}
  // Find User By ID
  async findById(id: string): Promise<User | null> {
    const foundUser = await findRecordById(users, id);

    return foundUser ? this.toDomain(foundUser) : null;
  }

  // Find User By Email
  async findByEmail(email: Email): Promise<User | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.value));

    return foundUser ? this.toDomain(foundUser) : null;
  }

  // Find All Users
  async findAll(): Promise<User[]> {
    const records = await findAllRecords(users);

    return records.map((record) => this.toDomain(record));
  }
async delete(id: string): Promise<boolean> {
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning({ id: users.id });

  return !!deletedUser;
}
  // Convert Database Record To Domain Entity
  private toDomain(
    record: typeof users.$inferSelect,
  ): User {
    return User.create({
      id: record.id,
      name: record.name,
      email: Email.create(record.email),
      password: record.password,
      role: record.role,
      gender: record.gender,
      createdAt: record.createdAt,
    });
    
  }
}
