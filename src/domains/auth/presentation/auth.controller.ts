import type { Request, Response } from 'express';

import { loginUseCase } from '../infrastructure/auth.dependencies.js';

export const loginController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await loginUseCase.execute({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Login failed';

    const statusCode =
      message === 'Invalid email or password' ? 401 : 400;

    res.status(statusCode).json({ message });
  }
};