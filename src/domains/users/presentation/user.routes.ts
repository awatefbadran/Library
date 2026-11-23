import { Router } from 'express';

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from './user.controller.js';
import { authenticate } from '../../../shared/middlewares/authenticate.js';
import { createUserSchema } from './validators/create-user.validator.js';
import { validate } from '../../../shared/middlewares/validate.js';
import { updateUserSchema } from './validators/update-user.validator.js';
import { authorize } from '../../../shared/middlewares/authorize.js';
const router = Router();

router.get('/', authenticate, getAllUsersController);
router.get('/:id', authenticate, getUserByIdController);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(createUserSchema),
  createUserController,
);
router.patch(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(updateUserSchema),
  updateUserController,
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  deleteUserController,
);

export default router;