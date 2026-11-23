export const USER_ROLES = ['admin', 'member'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const GENDERS = ['male', 'female'] as const;

export type Gender = (typeof GENDERS)[number];