import { Router } from 'express';

import authRouter from './authRouter.js';
import testRouter from './testRouter.js';
import disciplineRouter from './disciplineRouter.js';

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(disciplineRouter);

export default router;