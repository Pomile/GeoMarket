import { Router } from 'express';
import authRoutes from './auth.routes';
import marketRoutes from './market.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/market', marketRoutes);

export default router;
