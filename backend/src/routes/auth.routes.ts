import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/validate-token', authController.validateToken);

export default router;
