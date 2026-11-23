import { Router } from 'express';

import { loginController } from './auth.controller.js';

import { validate } from '../../../shared/middlewares/validate.js';

import { loginSchema } from './validators/login.validator.js';

const router = Router();

router.post('/login', validate(loginSchema), loginController);

export default router;