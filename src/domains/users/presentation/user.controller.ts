
import type { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case.js';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case.js';
import { DrizzleUserRepository } from '../infrastructure/persistence/user.repository.impl.js';
import { PasswordHasher } from '../infrastructure/security/password-hasher.js';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case.js';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case.js';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case.js';
import { validate as isUUID } from 'uuid';
const userRepository = new DrizzleUserRepository();
const passwordHasher = new PasswordHasher();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  passwordHasher,
);
const getAllUsersUseCase = new GetAllUsersUseCase(
  userRepository,
);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const createUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await createUserUseCase.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'member',
      gender: req.body.gender ?? null,
    });

    res.status(201).json({
      message: 'User created successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email.value,
        role: user.role,
        gender: user.gender,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error instanceof Error
        ? error.message
        : 'Failed to create user',
    });
  }
};
export const getAllUsersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const users = await getAllUsersUseCase.execute();

    const safeUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email.value,
      role: user.role,
      gender: user.gender,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      message: 'Users retrieved successfully',
      data: safeUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to retrieve users',
    });
  }
};
export const getUserByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
  const id = req.params.id;

if (typeof id !== 'string') {
  res.status(400).json({ message: 'Invalid user ID' });
  return;
}

const user = await getUserByIdUseCase.execute(id);
    res.status(200).json({
      message: 'User retrieved successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email.value,
        role: user.role,
        gender: user.gender,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Failed to retrieve user';

    res.status(message === 'User not found' ? 404 : 500).json({
      message,
    });
  }
};
const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const updateUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string' || !isUUID(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await updateUserUseCase.execute({
      id,
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
    });

    res.status(200).json({
      message: 'User updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email.value,
        role: user.role,
        gender: user.gender,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Failed to update user';

    const statusCode =
      message === 'User not found' ? 404 : 400;

    res.status(statusCode).json({ message });
  }
};
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const deleteUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string') {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    await deleteUserUseCase.execute(id);

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Failed to delete user';

    const statusCode =
      message === 'User not found' ? 404 : 400;

    res.status(statusCode).json({ message });
  }
};