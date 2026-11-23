import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .optional(),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .optional(),

  gender: z.enum(['male', 'female'])
    .nullable()
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);