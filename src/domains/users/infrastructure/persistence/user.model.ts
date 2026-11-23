
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

import {
  USER_ROLES,
  GENDERS,
} from '../../../../shared/enums/user.enum.js';

export const userRoleEnum = pgEnum('user_role', USER_ROLES);

export const genderEnum = pgEnum('gender', GENDERS);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: varchar('name', { length: 100 }).notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  password: varchar('password', { length: 255 }).notNull(),

  role: userRoleEnum('role').default('member').notNull(),

  gender: genderEnum('gender'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type UserRecord = typeof users.$inferSelect;

export type NewUserRecord = typeof users.$inferInsert;
