import express from 'express';
import userRoutes from './domains/users/presentation/user.routes.js';
import authRoutes from './domains/auth/presentation/auth.routes.js';
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
export default app;