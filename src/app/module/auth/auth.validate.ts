import { z } from 'zod';

const loginValidateSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});
const registerValidateSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  password: z.string({ required_error: 'Password is required.' }),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean().default(false),
});

export const AuthValidation = {
  loginValidateSchema,
  registerValidateSchema,
};
