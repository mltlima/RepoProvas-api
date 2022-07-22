import { Router } from 'express';

import authRouter from './authRouter.js';
import testRouter from './testRouter.js';
import disciplineRouter from './disciplineRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(disciplineRouter);
router.use(categoryRouter);

export default router;