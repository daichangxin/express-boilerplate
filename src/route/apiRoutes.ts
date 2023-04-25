import { Router } from 'express';
import { userRouter } from '../module/user/user.route';

export const apiRoutes = Router();
apiRoutes.use('/user', userRouter);
